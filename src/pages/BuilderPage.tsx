import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, FileText, GraduationCap, Briefcase, Wrench, 
  Code, Award, Trophy, Languages, Heart, Users,
  ArrowLeft, Download, Eye, Sparkles, Layout,
  Printer, ChevronRight, Menu, X, Code2, Loader2
} from 'lucide-react'
import { useResume } from '../context/ResumeContext'
import PersonalInfoForm from '../components/builder/PersonalInfo'
import SummaryForm from '../components/builder/ProfessionalSummary'
import EducationForm from '../components/builder/Education'
import ExperienceForm from '../components/builder/Experience'
import SkillsForm from '../components/builder/Skills'
import ProjectsForm from '../components/builder/Projects'
import CertificationsForm from '../components/builder/Certifications'
import AchievementsForm from '../components/builder/Achievements'
import LanguagesForm from '../components/builder/Languages'
import InterestsForm from '../components/builder/Interests'
import ReferencesForm from '../components/builder/References'
import CodingProfilesForm from '../components/builder/CodingProfiles'
import LivePreview from '../components/builder/LivePreview'
import AIAssistant from '../components/builder/AIAssistant'
import type { ActiveSection } from '../types'

const SECTIONS: { id: ActiveSection; label: string; icon: React.FC<any> }[] = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'codingProfiles', label: 'Coding Profiles', icon: Code2 },
  { id: 'languages', label: 'Languages', icon: Languages },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'references', label: 'References', icon: Users },
]

const BuilderPage: React.FC = () => {
  const { activeSection, setActiveSection, resumeData, setSelectedTemplate } = useResume()
  const location = useLocation()
  
  // Read template from query param when page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const templateParam = params.get('template')
    if (templateParam) {
      setSelectedTemplate(templateParam)
    }
  }, [location.search, setSelectedTemplate])
  const [showAi, setShowAi] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showPreviewMobile, setShowPreviewMobile] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Detect mobile device
  const isMobileDevice = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // DOWNLOAD IMAGE — works on both mobile and desktop
  const downloadImage = async () => {
    const element = document.getElementById('resume-preview-content')
    if (!element) {
      alert('Resume preview not found. Please switch to Preview mode first.')
      return
    }

    setIsDownloading(true)

    const wrapper = element.parentElement as HTMLElement | null
    let savedTransform = ''
    let savedWidth = ''
    let savedHeight = ''
    let savedClassName = ''

    if (wrapper) {
      savedTransform = wrapper.style.transform
      savedWidth = wrapper.style.width
      savedHeight = wrapper.style.height
      savedClassName = wrapper.className
      wrapper.className = ''
      wrapper.style.transform = 'none'
      wrapper.style.width = '794px'
      wrapper.style.height = 'auto'
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 300))

      const htmlToImage = await import('html-to-image')

      const dataUrl = await htmlToImage.toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: { transform: 'none', boxShadow: 'none' },
      })

      const fileName = `${resumeData.personalInfo.fullName || 'Resume'}.png`

      if (isMobileDevice()) {
        // Mobile: convert dataUrl to blob and open in new tab (works on iOS & Android)
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = fileName
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5000)
      } else {
        // Desktop: standard anchor download
        const link = document.createElement('a')
        link.download = fileName
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

    } catch (error: any) {
      console.error('Download error:', error)
      alert('Failed to generate image. Please try again.')
    } finally {
      if (wrapper) {
        wrapper.style.transform = savedTransform
        wrapper.style.width = savedWidth
        wrapper.style.height = savedHeight
        wrapper.className = savedClassName || 'transform scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-[0.9] transition-transform duration-300 origin-top'
      }
      setIsDownloading(false)
    }
  }

  // PRINT — opens the browser print dialog
  const printResume = () => {
    const style = document.createElement('style')
    style.id = 'print-resume-style'
    style.innerHTML = `
      @media print {
        body {
          background: white !important;
        }
        header, aside, main, .md\\:flex, .lg\\:static {
          display: none !important;
        }
        #resume-preview-content {
          position: fixed;
          left: 0;
          top: 0;
          width: 210mm;
          min-height: 297mm;
          margin: 0 !important;
          transform: none !important;
          box-shadow: none !important;
          border: none !important;
          z-index: 99999;
          visibility: visible !important;
        }
        body * {
          visibility: hidden;
        }
        #resume-preview-content, #resume-preview-content * {
          visibility: visible;
        }
      }
    `
    document.head.appendChild(style)
    
    window.print()
    
    setTimeout(() => {
      const el = document.getElementById('print-resume-style')
      if (el) el.remove()
    }, 1000)
  }

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal': return <PersonalInfoForm />
      case 'summary': return <SummaryForm />
      case 'education': return <EducationForm />
      case 'experience': return <ExperienceForm />
      case 'skills': return <SkillsForm />
      case 'projects': return <ProjectsForm />
      case 'certifications': return <CertificationsForm />
      case 'achievements': return <AchievementsForm />
      case 'codingProfiles': return <CodingProfilesForm />
      case 'languages': return <LanguagesForm />
      case 'interests': return <InterestsForm />
      case 'references': return <ReferencesForm />
      default: return null
    }
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden sm:block">
            <input 
              type="text" 
              defaultValue="Untitled Resume" 
              className="bg-transparent border-none text-lg font-bold text-slate-900 dark:text-white focus:ring-0 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-2 py-1 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setShowAi(!showAi)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Download Actions — visible on all screen sizes */}
          <div className="flex items-center gap-2">
            <button 
              onClick={printResume}
              className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" 
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={downloadImage}
              disabled={isDownloading}
              className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/20 transition-all text-sm disabled:opacity-70"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download'}</span>
            </button>
          </div>

          {/* Mobile Preview Toggle */}
          <button 
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="md:hidden w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
          >
            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar (Navigation) */}
        <aside className={`absolute lg:static inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 transform transition-transform duration-300 lg:translate-x-0 ${showMobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full overflow-y-auto p-4 scrollbar-none">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Resume Sections</h3>
            <nav className="space-y-1">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    setShowMobileNav(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    {section.label}
                  </div>
                  {activeSection === section.id && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Middle Area (Editor) */}
        <main className={`flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 md:p-8 ${showPreviewMobile ? 'hidden md:block' : 'block'}`}>
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveForm()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right Area (Live Preview) */}
        <aside className={`absolute md:static inset-0 md:inset-auto md:w-[45%] lg:w-1/2 xl:w-[55%] bg-slate-200/50 dark:bg-slate-900 z-20 transition-transform duration-300 border-l border-slate-200 dark:border-slate-800 ${showPreviewMobile ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          {/* Mobile download bar inside preview */}
          <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowPreviewMobile(false)}
              className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-medium"
            >
              <X className="w-4 h-4" /> Close Preview
            </button>
            <button
              onClick={downloadImage}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm disabled:opacity-70 transition-all"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isDownloading ? 'Generating...' : 'Download'}
            </button>
          </div>
          <div className="h-full overflow-y-auto p-4 md:p-8 flex items-start justify-center">
            <LivePreview />
          </div>
        </aside>

        {/* AI Assistant Overlay */}
        <AnimatePresence>
          {showAi && (
            <AIAssistant onClose={() => setShowAi(false)} />
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default BuilderPage
