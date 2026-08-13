import React from 'react'
import { Code2, Plus, Trash2, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import SectionCard from './SectionCard'

const CodingProfilesForm: React.FC = () => {
  const { resumeData, setResumeData } = useResume()
  const { codingProfiles } = resumeData

  const handleAdd = () => {
    const newProfile = {
      id: Date.now().toString(),
      platform: 'LeetCode',
      url: '',
      problemsSolved: '',
      rating: '',
      badges: ''
    }
    setResumeData(prev => ({
      ...prev,
      codingProfiles: [...prev.codingProfiles, newProfile]
    }))
  }

  const handleDelete = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      codingProfiles: prev.codingProfiles.filter(p => p.id !== id)
    }))
  }

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      codingProfiles: prev.codingProfiles.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }))
  }

  const platforms = ['LeetCode', 'HackerRank', 'Codeforces', 'CodeChef', 'HackerEarth', 'Other']

  return (
    <SectionCard 
      title="Coding Profiles" 
      description="Showcase your competitive programming achievements and problem-solving skills."
      icon={Code2}
    >
      <div className="space-y-6">
        {codingProfiles.map((profile, index) => (
          <div key={profile.id} className="p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 relative group">
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hidden md:flex">
              <GripVertical className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex justify-between items-start mb-4">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Profile {index + 1}</h4>
              <button 
                onClick={() => handleDelete(profile.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                title="Delete Profile"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform</label>
                <select
                  value={profile.platform}
                  onChange={e => handleChange(profile.id, 'platform', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                  {platforms.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile URL</label>
                <input 
                  type="text" 
                  value={profile.url}
                  onChange={e => handleChange(profile.id, 'url', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. leetcode.com/username"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Problems Solved</label>
                <input 
                  type="text" 
                  value={profile.problemsSolved}
                  onChange={e => handleChange(profile.id, 'problemsSolved', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. 500+"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contest Rating (Optional)</label>
                <input 
                  type="text" 
                  value={profile.rating}
                  onChange={e => handleChange(profile.id, 'rating', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. 1850 (Knight)"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Badges / Achievements (Optional)</label>
                <input 
                  type="text" 
                  value={profile.badges}
                  onChange={e => handleChange(profile.id, 'badges', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. 50 Days Badge 2023, Top 5% in Weekly Contest"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Coding Profile
        </button>
      </div>
    </SectionCard>
  )
}

export default CodingProfilesForm
