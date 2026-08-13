import React, { useState } from 'react'
import { Briefcase, Plus, Trash2, GripVertical, Sparkles, Loader2 } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'
import { improveDescription } from '../../utils/aiHelper'

const ExperienceForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { experience } = resumeData
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const handleAiImprove = async (id: string, currentText: string, company: string, position: string) => {
    if (loadingIds[id]) return
    setLoadingIds(prev => ({ ...prev, [id]: true }))
    try {
      const contextTitle = position && company ? `${position} at ${company}` : (position || company || 'responsibilities')
      const improved = await improveDescription(currentText, contextTitle)
      handleChange(id, 'description', improved)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingIds(prev => ({ ...prev, [id]: false }))
    }
  }

  return (
    <SectionCard 
      title="Work Experience" 
      description="Add your work experience starting from the most recent."
      icon={Briefcase}
    >
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(exp.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                <input 
                  type="text" 
                  value={exp.company}
                  onChange={e => handleChange(exp.id, 'company', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Google"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Title</label>
                <input 
                  type="text" 
                  value={exp.position}
                  onChange={e => handleChange(exp.id, 'position', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                <input 
                  type="text" 
                  value={exp.location}
                  onChange={e => handleChange(exp.id, 'location', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Mountain View, CA"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Start Date</label>
                <input 
                  type="text" 
                  value={exp.startDate}
                  onChange={e => handleChange(exp.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Jan 2021"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">End Date</label>
                <input 
                  type="text" 
                  value={exp.endDate}
                  onChange={e => handleChange(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none ${exp.current ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  placeholder="e.g. Present"
                />
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={e => handleChange(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                    I currently work here
                  </label>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <button 
                    type="button"
                    onClick={() => handleAiImprove(exp.id, exp.description, exp.company, exp.position)}
                    disabled={loadingIds[exp.id]}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-medium rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors disabled:opacity-75"
                  >
                    {loadingIds[exp.id] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {loadingIds[exp.id] ? 'Writing...' : 'Write with AI'}
                  </button>
                </div>
                <textarea 
                  value={exp.description}
                  onChange={e => handleChange(exp.id, 'description', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y leading-relaxed" 
                  placeholder="• Describe your responsibilities and achievements&#10;• Use metrics where possible (e.g., increased revenue by 20%)&#10;• Start with strong action verbs"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>
    </SectionCard>
  )
}

export default ExperienceForm
