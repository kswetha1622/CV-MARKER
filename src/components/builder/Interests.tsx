import React, { useState } from 'react'
import { Heart, X } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const InterestsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { interests } = resumeData
  const [inputValue, setInputValue] = useState('')

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!interests.includes(inputValue.trim())) {
        setResumeData(prev => ({
          ...prev,
          interests: [...prev.interests, inputValue.trim()]
        }))
      }
      setInputValue('')
    }
  }

  const handleRemoveInterest = (interestToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }))
  }

  return (
    <SectionCard 
      title="Interests & Hobbies" 
      description="Adding hobbies can help showcase your personality and cultural fit."
      icon={Heart}
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Add an interest</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddInterest}
            placeholder="e.g. Rock Climbing (Press Enter)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Your Interests</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700"
              >
                {interest}
                <button 
                  onClick={() => handleRemoveInterest(interest)}
                  className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {interests.length === 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No interests added yet.</p>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export default InterestsForm
