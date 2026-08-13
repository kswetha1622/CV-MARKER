import React, { useState } from 'react'
import { Wrench, X, Sparkles, Plus } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const SkillsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { skills } = resumeData
  const [inputValue, setInputValue] = useState('')

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!skills.includes(inputValue.trim())) {
        setResumeData(prev => ({
          ...prev,
          skills: [...prev.skills, inputValue.trim()]
        }))
      }
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const suggestedSkills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker', 'GraphQL']

  return (
    <SectionCard 
      title="Skills" 
      description="List technical, professional, or soft skills relevant to your target role."
      icon={Wrench}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Add a skill</label>
            <button className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 text-xs font-medium hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5" />
              Suggest skills based on Job Title
            </button>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Type a skill and press Enter..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Your Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800/50"
              >
                {skill}
                <button 
                  onClick={() => handleRemoveSkill(skill)}
                  className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No skills added yet.</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">Suggested for you:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.filter(s => !skills.includes(s)).map((skill, index) => (
              <button
                key={index}
                onClick={() => {
                  setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }))
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export default SkillsForm
