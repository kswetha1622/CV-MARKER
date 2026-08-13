import React, { useRef } from 'react'
import { User, Camera, Trash2 } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const PersonalInfoForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { personalInfo } = resumeData
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profilePhoto: event.target!.result as string }
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, profilePhoto: '' }
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <SectionCard 
      title="Personal Information" 
      description="Add your contact details and a professional photo."
      icon={User}
    >
      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="flex items-center gap-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <div 
            onClick={handleUploadClick}
            className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group overflow-hidden"
          >
            {personalInfo.profilePhoto ? (
              <img src={personalInfo.profilePhoto} alt="Profile" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <Camera className="w-6 h-6 mb-1 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-medium">Add Photo</span>
              </>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Profile Photo (Optional)</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Upload a professional headshot. Max size 2MB.</p>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={handleUploadClick}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Upload Image
              </button>
              {personalInfo.profilePhoto && (
                <button 
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-colors flex items-center justify-center"
                  title="Remove Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Alex Johnson"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Title</label>
            <input 
              type="text" 
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input 
              type="email" 
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. alex@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. +1 (555) 123-4567"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location / Address</label>
            <input 
              type="text" 
              name="address"
              value={personalInfo.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn URL</label>
            <input 
              type="text" 
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. linkedin.com/in/alex"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub URL</label>
            <input 
              type="text" 
              name="github"
              value={personalInfo.github}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. github.com/alex"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Portfolio Website</label>
            <input 
              type="text" 
              name="portfolio"
              value={personalInfo.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. alex.dev"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export default PersonalInfoForm
