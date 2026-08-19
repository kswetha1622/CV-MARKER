import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: '/#pricing', badge: 'Soon' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const isDashboard = ['/dashboard', '/builder', '/settings', '/templates'].some(p =>
    location.pathname.startsWith(p)
  )

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isDashboard
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#E2E8F0] dark:border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">
                CV Spark
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => {
                    if (link.href.startsWith('/#')) {
                      e.preventDefault()
                      if (location.pathname !== '/') {
                        navigate('/')
                        setTimeout(() => {
                          document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                        }, 300)
                      } else {
                        document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    location.pathname === link.href
                      ? 'text-[#10B981] bg-[#E6F4EA] dark:bg-[#10B981]/20'
                      : 'text-[#0F172A] dark:text-slate-300 hover:text-[#10B981] hover:bg-[#F4F7F5] dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-bold bg-[#E6F4EA] text-[#137333] px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  scrolled || isDashboard
                    ? 'bg-[#F4F7F5] dark:bg-slate-800 hover:bg-[#E2E8F0] dark:hover:bg-slate-700 text-[#475569] dark:text-slate-300'
                    : 'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#475569] dark:text-slate-300'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-[#0F172A] dark:text-white hover:text-[#10B981] transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#0F172A] text-white shadow-md hover:bg-black hover:scale-105 transition-all duration-200 dark:bg-white dark:text-[#0F172A] dark:hover:bg-slate-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-[#F4F7F5] dark:bg-slate-800 text-[#0F172A] dark:text-white`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] dark:border-slate-800">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">
                    CV Spark
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 flex items-center justify-center text-[#0F172A] dark:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={e => {
                      setIsOpen(false)
                      if (link.href.startsWith('/#')) {
                        e.preventDefault()
                        document.getElementById(link.href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-[#0F172A] dark:text-white hover:bg-[#E6F4EA] dark:hover:bg-[#10B981]/20 hover:text-[#10B981] transition-all duration-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-bold bg-[#E6F4EA] text-[#137333] px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="p-5 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between px-2 py-2 mb-2">
                  <span className="text-sm font-bold text-[#0F172A] dark:text-white">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                      darkMode ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3.5 rounded-xl border-2 border-[#CBD5E1] text-sm font-bold text-[#0F172A] dark:text-white hover:bg-[#F1F5F9] dark:hover:bg-slate-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3.5 rounded-xl bg-[#0F172A] dark:bg-white text-sm font-bold text-white dark:text-[#0F172A] shadow-md hover:scale-[1.02] transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
