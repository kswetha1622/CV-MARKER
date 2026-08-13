import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ResumeData, ActiveSection } from '../types'
import { useAuth } from './AuthContext'
import { db, doc, getDoc, setDoc } from '../lib/firebase'

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '', jobTitle: '', email: '', phone: '', address: '',
    linkedin: '', github: '', portfolio: '', profilePhoto: '', summary: '',
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
  references: [],
  codingProfiles: [],
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

  // Load resume from Firestore when user logs in
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
        const docRef = doc(db, 'resumes', user.uid)
        const docSnap = await getDoc(docRef)
        if (isMounted) {
          if (docSnap.exists()) {
            const data = docSnap.data()
            setResumeData(data.resumeData as ResumeData || defaultResumeData)
            setSelectedTemplate(data.selectedTemplate || 'modern')
          } else {
            setResumeData(defaultResumeData)
          }
          setInitialLoadDone(true)
        }
      } catch (err) {
        console.error('Failed to load resume from Firestore:', err)
        // Fallback to localStorage if Firestore fails
        try {
          const saved = localStorage.getItem(`resume_${user.uid}`)
          if (saved && isMounted) {
            const parsed = JSON.parse(saved)
            setResumeData(parsed.resumeData || defaultResumeData)
            setSelectedTemplate(parsed.selectedTemplate || 'modern')
          }
        } catch { /* ignore */ }
        if (isMounted) setInitialLoadDone(true)
      }
    }
    loadResume()
    return () => { isMounted = false }
  }, [user])

  // Auto-save resume to Firestore (debounced 2s)
  useEffect(() => {
    if (!user || !initialLoadDone) return

    const timer = setTimeout(async () => {
      setIsSaving(true)
      try {
        await setDoc(doc(db, 'resumes', user.uid), {
          resumeData,
          selectedTemplate,
          updatedAt: new Date().toISOString(),
        })
        // Also save to localStorage as backup
        localStorage.setItem(`resume_${user.uid}`, JSON.stringify({ resumeData, selectedTemplate }))
      } catch (err) {
        console.error('Failed to save resume to Firestore:', err)
        // Fallback: save to localStorage
        try {
          localStorage.setItem(`resume_${user.uid}`, JSON.stringify({ resumeData, selectedTemplate }))
        } catch { /* ignore */ }
      } finally {
        setIsSaving(false)
      }
    }, 2000)

    return () => clearTimeout(timer)
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
