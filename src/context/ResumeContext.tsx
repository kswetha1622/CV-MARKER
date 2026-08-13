import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ResumeData, ActiveSection } from '../types'
import { useAuth } from './AuthContext'

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '', jobTitle: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: '', profilePhoto: '', summary: '',
  },
  skills: [], education: [], experience: [], projects: [], certifications: [], achievements: [], languages: [], interests: [], references: [], codingProfiles: [],
}

interface ResumeContextType {
  resumeData: ResumeData
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
  activeSection: ActiveSection
  setActiveSection: React.Dispatch<React.SetStateAction<ActiveSection>>
  selectedTemplate: string
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>
  isSaving: boolean
}

const ResumeContext = createContext<ResumeContextType>({
  resumeData: defaultResumeData,
  setResumeData: () => {},
  activeSection: 'personal',
  setActiveSection: () => {},
  selectedTemplate: 'modern',
  setSelectedTemplate: () => {},
  isSaving: false,
})

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [activeSection, setActiveSection] = useState<ActiveSection>('personal')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [isSaving, setIsSaving] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  // Load from LocalStorage when user changes
  useEffect(() => {
    let isMounted = true
    const loadResume = async () => {
      if (!user) {
        if (isMounted) {
          setResumeData(defaultResumeData)
          setInitialLoadDone(true)
        }
        return
      }
      try {
        const savedData = localStorage.getItem(`cv_spark_resume_${user.uid}`)
        if (isMounted) {
          if (savedData) {
            const parsed = JSON.parse(savedData)
            setResumeData(parsed.resumeData as ResumeData || defaultResumeData)
            setSelectedTemplate(parsed.selectedTemplate || 'modern')
          } else {
            setResumeData(defaultResumeData)
          }
          setInitialLoadDone(true)
        }
      } catch (err) {
        console.error('Failed to load resume:', err)
        if (isMounted) setInitialLoadDone(true)
      }
    }
    loadResume()
    return () => { isMounted = false }
  }, [user])

  // Save to LocalStorage when data changes (debounced)
  useEffect(() => {
    if (!user || !initialLoadDone) return

    const saveData = async () => {
      setIsSaving(true)
      try {
        const dataToSave = {
          resumeData,
          selectedTemplate,
          updatedAt: new Date().toISOString()
        }
        localStorage.setItem(`cv_spark_resume_${user.uid}`, JSON.stringify(dataToSave))
      } catch (err) {
        console.error('Failed to save resume:', err)
      } finally {
        setIsSaving(false)
      }
    }

    const timeoutId = setTimeout(saveData, 1000) // Auto-save after 1 second of inactivity
    return () => clearTimeout(timeoutId)
  }, [resumeData, selectedTemplate, user, initialLoadDone])

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, activeSection, setActiveSection, selectedTemplate, setSelectedTemplate, isSaving }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => useContext(ResumeContext)
