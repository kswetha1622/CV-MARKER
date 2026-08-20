import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Settings, Bell, Palette, Globe, 
  Moon, Sun, Save, ArrowLeft, Shield, Smartphone,
  Mail, Key, Sparkles, Upload
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import { updateProfile } from 'firebase/auth'

const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'notifications' | 'language' | 'security'>('profile')
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  // Ignore Google's photoURL, only keep if it's an uploaded Data URL
  const initialPhoto = user?.photoURL?.startsWith('data:') ? user.photoURL : ''
  const [localPhoto, setLocalPhoto] = useState(initialPhoto)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'theme', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language & Region', icon: Globe },
  ] as const

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLocalPhoto(result)
        // Optionally update Firebase profile if small enough, but usually requires Storage.
        // We'll just update it in session for visual feedback as requested.
        if (user) {
          updateProfile(user, { photoURL: result }).catch(console.error)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-[#475569] hover:text-[#10B981] dark:text-slate-400 dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="bg-[#E6F4EA] dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8F0] dark:border-slate-800 p-3 sticky top-28">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#E6F4EA] dark:bg-[#10B981]/20 text-[#137333] dark:text-[#10B981]'
                      : 'text-[#475569] dark:text-slate-400 hover:bg-[#F4F7F5] dark:hover:bg-slate-800 hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#10B981]' : 'text-[#94A3B8] dark:text-slate-500'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-[#E6F4EA] dark:bg-slate-900 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden min-h-[600px] flex flex-col">
            
            <div className="p-6 md:p-8 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between bg-[#F4F7F5] dark:bg-slate-900/50">
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit'] capitalize">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h1>
                <p className="text-sm font-medium text-[#475569] dark:text-slate-400 mt-1">
                  Manage your account and preferences.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-1">
              <AnimatePresence mode="wait">
                
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] p-1 shadow-lg shadow-[#10B981]/20">
                        <div className="w-full h-full rounded-full bg-[#10B981] dark:bg-[#10B981] border-2 border-[#059669] flex items-center justify-center text-3xl font-bold text-white dark:text-white overflow-hidden">
                          {localPhoto ? (
                            <img src={localPhoto} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            (displayName || user?.email || 'U').substring(0, 2).toUpperCase()
                          )}
                        </div>
                      </div>
                      <div>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handlePhotoUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-5 py-2.5 bg-[#F4F7F5] dark:bg-slate-800 border-2 border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Photo
                        </button>
                        <p className="text-xs font-medium text-[#94A3B8] dark:text-slate-400 mt-3">
                          JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">Display Name</label>
                        <input 
                          type="text" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5] dark:bg-slate-900 text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue={user?.email || ''} 
                          className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F1F5F9] dark:bg-slate-800 text-[#94A3B8] dark:text-slate-500 cursor-not-allowed outline-none font-medium" 
                          readOnly 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Theme Settings */}
                {activeTab === 'theme' && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-white mb-4">Appearance</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                        
                        <button 
                          onClick={() => !darkMode && toggleDarkMode()}
                          className={`p-5 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                            !darkMode ? 'border-[#10B981] bg-[#E6F4EA]/50 dark:bg-transparent shadow-sm' : 'border-[#E2E8F0] dark:border-slate-700 hover:border-[#10B981]/50'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${!darkMode ? 'bg-[#10B981] text-white shadow-md' : 'bg-[#F4F7F5] dark:bg-slate-800 text-[#94A3B8]'}`}>
                            <Sun className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A] dark:text-white mb-1">Light Mode</p>
                            <p className="text-sm font-medium text-[#475569] dark:text-slate-400">Clean and bright look.</p>
                          </div>
                        </button>

                        <button 
                          onClick={() => darkMode && toggleDarkMode()}
                          className={`p-5 rounded-2xl border-2 text-left flex items-start gap-4 transition-all ${
                            darkMode ? 'border-[#10B981] bg-[#10B981]/10 shadow-sm' : 'border-[#E2E8F0] dark:border-slate-700 hover:border-[#10B981]/50'
                          }`}
                        >
                          <div className={`p-3 rounded-xl ${darkMode ? 'bg-[#10B981] text-white shadow-md' : 'bg-[#F4F7F5] dark:bg-slate-800 text-[#94A3B8]'}`}>
                            <Moon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A] dark:text-white mb-1">Dark Mode</p>
                            <p className="text-sm font-medium text-[#475569] dark:text-slate-400">Easy on the eyes.</p>
                          </div>
                        </button>

                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5 max-w-2xl"
                  >
                    {[
                      { title: 'Email Notifications', desc: 'Receive weekly tips on resume building.', default: true, icon: Mail },
                      { title: 'Push Notifications', desc: 'Get alerted when a recruiter views your linked resume.', default: false, icon: Smartphone },
                      { title: 'Product Updates', desc: 'Be the first to know about new templates and features.', default: true, icon: Sparkles },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between p-5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5]/50 dark:bg-slate-800/30">
                        <div className="flex gap-4">
                          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-[#E2E8F0] dark:border-slate-700 h-fit">
                            <item.icon className="w-5 h-5 text-[#10B981]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A] dark:text-white">{item.title}</p>
                            <p className="text-sm font-medium text-[#475569] dark:text-slate-400 mt-1">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer mt-2">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E2E8F0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#10B981]"></div>
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Security */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8 max-w-2xl"
                  >
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-white mb-5">Change Password</h3>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5] dark:bg-slate-900 text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] outline-none font-medium" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5] dark:bg-slate-900 text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] outline-none font-medium" />
                        </div>
                        <button className="px-6 py-3 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-bold rounded-xl hover:bg-black dark:hover:bg-slate-200 transition-colors text-sm shadow-md">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-[#E2E8F0] dark:border-slate-800">
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm font-medium text-[#475569] dark:text-slate-400 mb-5">Add an extra layer of security to your account.</p>
                      <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 font-bold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-slate-700 transition-colors text-sm shadow-sm">
                        <Key className="w-4 h-4" />
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Language */}
                {activeTab === 'language' && (
                  <motion.div
                    key="language"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-md space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">App Language</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5] dark:bg-slate-900 text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] outline-none appearance-none font-medium">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish (ES)</option>
                        <option>French (FR)</option>
                        <option>German (DE)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">Timezone</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F5] dark:bg-slate-900 text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] outline-none appearance-none font-medium">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Coordinated Universal Time (UTC)</option>
                        <option>Central European Time (CET)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            
            {/* Action Bar */}
            <div className="p-6 md:px-8 border-t border-[#E2E8F0] dark:border-slate-800 bg-transparent dark:bg-slate-900 flex items-center justify-end gap-4 mt-auto">
              <button className="px-6 py-3 rounded-xl text-sm font-bold text-[#475569] dark:text-slate-400 hover:bg-[#F4F7F5] dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (user && displayName !== user.displayName) {
                    updateProfile(user, { displayName }).catch(console.error)
                  }
                }}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold shadow-[0_4px_14px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
