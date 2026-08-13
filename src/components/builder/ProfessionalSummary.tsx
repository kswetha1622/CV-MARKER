import React, { useState } from 'react'
import { FileText, Sparkles, Loader2 } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'
import { improveSummary } from '../../utils/aiHelper'

const SummaryForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const [isImproving, setIsImproving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: e.target.value }
    }))
  }

  const handleAiImprove = async () => {
    if (isImproving) return
    setIsImproving(true)
    try {
      const current = resumeData.personalInfo.summary
      const jobTitle = resumeData.personalInfo.jobTitle
      const improved = await improveSummary(current, jobTitle)
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: improved }
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsImproving(false)
    }
  }

  return (
    <SectionCard 
      title="Professional Summary" 
      description="Write a short summary highlighting your most valuable skills and experience."
      icon={FileText}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Summary</label>
          <button 
            type="button"
            onClick={handleAiImprove}
            disabled={isImproving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-medium rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors disabled:opacity-75"
          >
            {isImproving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isImproving ? 'Improving...' : 'Improve with AI'}
          </button>
        </div>
        <textarea
          value={resumeData.personalInfo.summary}
          onChange={handleChange}
          rows={8}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y transition-colors leading-relaxed"
          placeholder="e.g. Passionate software engineer with 6+ years of experience building scalable web applications..."
        />
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <p>Tip: Keep it between 3-5 sentences.</p>
          <p>{resumeData.personalInfo.summary.length} characters</p>
        </div>
      </div>
    </SectionCard>
  )
}

export default SummaryForm
