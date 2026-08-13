import React from 'react'
import { motion } from 'framer-motion'

interface SectionCardProps {
  title: string
  description?: string
  icon: React.ElementType
  children: React.ReactNode
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, icon: Icon, children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">{title}</h2>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default SectionCard
