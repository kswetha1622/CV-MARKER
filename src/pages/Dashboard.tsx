import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, Plus, Sparkles, LayoutTemplate, 
  Settings, LogOut, MoreVertical, Download, 
  Trash2, Edit, TrendingUp, Clock, CheckCircle2 
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import { mockResumes } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'recent' | 'all'>('recent')

  const statsCards = [
    { label: 'Total Resumes', value: '3', icon: FileText, bg: 'bg-[#E6F4EA] dark:bg-[#10B981]/20', text: 'text-[#137333] dark:text-[#10B981]' },
    { label: 'Profile Strength', value: '85%', icon: TrendingUp, bg: 'bg-[#E6F4EA] dark:bg-[#10B981]/20', text: 'text-[#137333] dark:text-[#10B981]' },
    { label: 'Templates Used', value: '3', icon: LayoutTemplate, bg: 'bg-[#E6F4EA] dark:bg-[#10B981]/20', text: 'text-[#137333] dark:text-[#10B981]' },
  ]

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.substring(0, 2).toUpperCase()
  const photoURL = user?.photoURL

  return (
    <div className="min-h-screen bg-[#F4F7F5] dark:bg-slate-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden sticky top-28">
            <div className="p-6 text-center border-b border-[#E2E8F0] dark:border-slate-800">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] p-1 mb-4 shadow-lg shadow-[#10B981]/20">
                <div className="w-full h-full rounded-full bg-[#E6F4EA] dark:bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center text-2xl font-bold text-[#059669] dark:text-[#10B981] overflow-hidden">
                  {photoURL ? (
                    <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white truncate">{displayName}</h3>
              <p className="text-sm text-[#475569] dark:text-slate-400 mt-1 truncate">{user?.email || user?.phoneNumber}</p>
              
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#137333] dark:text-[#10B981] bg-[#E6F4EA] dark:bg-[#137333]/30 py-1.5 px-3 rounded-full inline-flex border border-[#D1E7DD] dark:border-transparent">
                <CheckCircle2 className="w-4 h-4" />
                Free Plan
              </div>
            </div>
            
            <div className="p-4 space-y-1">
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E6F4EA] dark:bg-[#137333]/30 text-[#137333] dark:text-[#10B981] font-bold transition-colors">
                <LayoutTemplate className="w-5 h-5" />
                My Resumes
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#475569] dark:text-slate-300 hover:bg-[#F4F7F5] dark:hover:bg-slate-800 hover:text-[#0F172A] dark:hover:text-white transition-colors font-bold">
                <Settings className="w-5 h-5" />
                Settings
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold mt-4">
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Welcome back, {displayName.split(' ')[0]}! 👋</h1>
              <p className="text-[#475569] dark:text-slate-400 mt-1">Here is what's happening with your resumes today.</p>
            </div>
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#10B981] text-white font-bold shadow-[0_4px_14px_rgba(16,185,129,0.2)] hover:bg-[#059669] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Build New Resume
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statsCards.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8F0] dark:border-slate-800 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.text}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#475569] dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0F172A] dark:text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumes Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0] dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-['Outfit'] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#10B981]" />
                My Resumes
              </h2>
              
              <div className="flex bg-[#F4F7F5] dark:bg-slate-800 p-1 rounded-lg border border-[#E2E8F0] dark:border-transparent">
                <button 
                  onClick={() => setActiveTab('recent')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${activeTab === 'recent' ? 'bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white shadow-sm' : 'text-[#475569] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-300'}`}
                >
                  Recent
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white shadow-sm' : 'text-[#475569] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-300'}`}
                >
                  All (3)
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Create New Card */}
                <Link to="/templates" className="group h-64 border-2 border-dashed border-[#CBD5E1] dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 bg-[#F4F7F5] dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-[#10B981] dark:hover:border-[#10B981] hover:shadow-md transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#E6F4EA] dark:bg-[#10B981]/20 text-[#137333] dark:text-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-[#475569] dark:text-slate-300 group-hover:text-[#10B981] transition-colors">Create New</span>
                </Link>

                {/* Resume Cards */}
                {mockResumes.map((resume, i) => {
                  // Replace old purple gradients with sage/mint aesthetics
                  const newColor = resume.color.includes('blue') || resume.color.includes('violet') 
                    ? 'from-[#10B981] to-[#059669]' 
                    : resume.color;

                  return (
                    <motion.div 
                      key={resume.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="group border border-[#E2E8F0] dark:border-slate-700 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all hover:border-[#10B981] dark:hover:border-[#10B981]/50 flex flex-col h-64 relative"
                    >
                      {/* Thumbnail Area */}
                      <div className={`h-32 bg-gradient-to-br ${newColor} p-4 relative overflow-hidden`}>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#0F172A] text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3 text-[#10B981]" />
                          {resume.score}%
                        </div>
                        
                        {/* Fake resume lines for thumbnail */}
                        <div className="mt-4 space-y-2 opacity-90">
                          <div className="h-2.5 w-1/3 bg-white rounded-full shadow-sm"></div>
                          <div className="h-2 w-1/4 bg-white/80 rounded-full"></div>
                          <div className="pt-2 space-y-1.5">
                            <div className="h-1.5 w-full bg-white/60 rounded-full"></div>
                            <div className="h-1.5 w-5/6 bg-white/60 rounded-full"></div>
                            <div className="h-1.5 w-4/5 bg-white/60 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#0F172A]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                          <Link to={`/builder?id=${resume.id}`} className="w-12 h-12 bg-[#10B981] text-white rounded-full flex items-center justify-center hover:bg-[#059669] hover:scale-105 transition-all shadow-lg" title="Edit">
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button className="w-12 h-12 bg-white text-[#0F172A] rounded-full flex items-center justify-center hover:bg-[#F4F7F5] hover:scale-105 transition-all shadow-lg" title="Download PDF">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-slate-800 relative z-10">
                        <div>
                          <h3 className="font-bold text-[#0F172A] dark:text-white truncate" title={resume.name}>{resume.name}</h3>
                          <p className="text-xs font-medium text-[#475569] dark:text-slate-400 mt-1 flex items-center gap-1.5">
                            <LayoutTemplate className="w-3 h-3" />
                            {resume.template}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9] dark:border-slate-700">
                          <p className="text-xs font-medium text-[#94A3B8] dark:text-slate-500 flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {resume.updated}
                          </p>
                          <button className="text-[#94A3B8] hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
