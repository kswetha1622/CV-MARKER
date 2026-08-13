import React from 'react'
import { Trophy, Plus, Trash2, GripVertical, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const AchievementsForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { achievements } = resumeData

  const handleAdd = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          date: ''
        }
      ]
    }))
  }

  const handleRemove = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(ach => 
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    }))
  }

  return (
    <SectionCard 
      title="Achievements & Awards" 
      description="Showcase your notable accomplishments, awards, or recognitions."
      icon={Trophy}
    >
      <div className="space-y-6">
        {achievements.map((ach, index) => (
          <div key={ach.id} className="relative group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-300 dark:hover:border-blue-700">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move p-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-slate-200 dark:border-slate-700 text-slate-400">
              <GripVertical className="w-4 h-4" />
            </div>
            
            <button 
              onClick={() => handleRemove(ach.id)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Achievement Title</label>
                <input 
                  type="text" 
                  value={ach.title}
                  onChange={e => handleChange(ach.id, 'title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Employee of the Month"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Received</label>
                <input 
                  type="text" 
                  value={ach.date}
                  onChange={e => handleChange(ach.id, 'date', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Oct 2023"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-medium rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                    Write with AI
                  </button>
                </div>
                <textarea 
                  value={ach.description}
                  onChange={e => handleChange(ach.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y leading-relaxed" 
                  placeholder="Describe what you achieved and its significance..."
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
          Add Achievement
        </button>
      </div>
    </SectionCard>
  )
}

export default AchievementsForm
