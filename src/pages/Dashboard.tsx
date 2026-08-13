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
    { label: 'Total Resumes', value: '3', icon: FileText, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500' },
    { label: 'Profile Strength', value: '85%', icon: TrendingUp, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-500' },
    { label: 'Templates Used', value: '3', icon: LayoutTemplate, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-500' },
  ]

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.substring(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-28">
            <div className="p-6 text-center border-b border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-violet-600 p-1 mb-4 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-violet-600">
                  {initials}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{displayName}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{user?.email || user?.phoneNumber}</p>
              
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 py-1.5 px-3 rounded-full inline-flex">
                <CheckCircle2 className="w-4 h-4" />
                Free Plan
              </div>
            </div>
            
            <div className="p-4 space-y-1">
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium transition-colors">
                <LayoutTemplate className="w-5 h-5" />
                My Resumes
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                <Settings className="w-5 h-5" />
                Settings
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium mt-4">
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
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">Welcome back, Alex! 👋</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what's happening with your resumes today.</p>
            </div>
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
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
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.text}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumes Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                My Resumes
              </h2>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('recent')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'recent' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  Recent
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  All (3)
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Create New Card */}
                <Link to="/templates" className="group h-64 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Create New</span>
                </Link>

                {/* Resume Cards */}
                {mockResumes.map((resume, i) => (
                  <motion.div 
                    key={resume.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 hover:shadow-xl transition-all hover:border-blue-200 dark:hover:border-blue-900/50 flex flex-col h-64 relative"
                  >
                    {/* Thumbnail Area */}
                    <div className={`h-32 bg-gradient-to-br ${resume.color} p-4 relative overflow-hidden`}>
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {resume.score}%
                      </div>
                      
                      {/* Fake resume lines for thumbnail */}
                      <div className="mt-4 space-y-1.5 opacity-80">
                        <div className="h-2 w-1/3 bg-white rounded-full"></div>
                        <div className="h-1.5 w-1/4 bg-white/70 rounded-full"></div>
                        <div className="pt-2 space-y-1">
                          <div className="h-1.5 w-full bg-white/50 rounded-full"></div>
                          <div className="h-1.5 w-5/6 bg-white/50 rounded-full"></div>
                          <div className="h-1.5 w-4/5 bg-white/50 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Link to={`/builder?id=${resume.id}`} className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="w-10 h-10 bg-white text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-slate-800 relative z-10">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate" title={resume.name}>{resume.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                          <LayoutTemplate className="w-3 h-3" />
                          {resume.template}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resume.updated}
                        </p>
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
