import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Sparkles, AlertCircle, Loader2, BookOpen, GraduationCap, PenTool
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Method = 'google' | 'email'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, loginWithGoogle, loginWithEmail } = useAuth()

  const [method, setMethod] = useState<Method>('google')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const clearMessages = () => setError('')

  const handleGoogle = async () => {
    clearMessages()
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch (err: any) {
      const code = err?.code || ''
      if (code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname
        setError(`⚠️ Add "${domain}" to Firebase: console.firebase.google.com → Project cv-spark-aa23e → Authentication → Settings → Authorized Domains → Add Domain → "${domain}"`)
      } else if (code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled. Please contact support. (auth/operation-not-allowed)')
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        setError(err?.message || `Google sign-in failed. (${code || 'unknown'})`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    clearMessages()
    if (!email || !password) { setError('Please fill in both fields.'); return }
    setLoading(true)
    try {
      await loginWithEmail(email, password)
    } catch (err: any) {
      if (err?.code === 'auth/invalid-credential') {
        setError('Invalid email or password. If you don\'t have an account, please sign up first.')
      } else if (err?.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up first.')
      } else if (err?.code === 'auth/wrong-password') {
        setError('Incorrect password. Try again or use Forgot Password.')
      } else {
        setError(err?.message || 'Failed to sign in.')
      }
    } finally {
      setLoading(false)
    }
  }

  const ErrorBox = () => error ? (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
    </motion.div>
  ) : null

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* ── Hero panel (left) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col items-center justify-center p-16 overflow-hidden bg-[#F4F7F5] dark:bg-slate-950 border-r border-[#E2E8F0] dark:border-slate-800">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <BookOpen className="absolute top-1/4 left-[10%] w-64 h-64 text-[#D1E7DD] opacity-20 -rotate-12 dark:opacity-5" />
          <GraduationCap className="absolute bottom-1/4 right-[10%] w-80 h-80 text-[#D1E7DD] opacity-20 rotate-12 dark:opacity-5" />
          <PenTool className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-[#E2E8F0] opacity-30 rotate-45 dark:opacity-10" />
        </div>
        <div className="relative z-10 max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">CV Spark</span>
          </Link>
          <h1 className="text-5xl font-bold text-[#0F172A] dark:text-white leading-tight mb-6 font-['Outfit']">Your career<br /><span className="text-[#059669]">starts here.</span></h1>
          <p className="text-lg text-[#475569] dark:text-slate-400 leading-relaxed">Build AI-powered resumes that land interviews.</p>
        </div>
      </div>

      {/* ── Auth panel (right) ── */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center min-h-screen p-6 bg-white dark:bg-slate-900">
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden group">
          <div className="w-9 h-9 rounded-xl bg-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">CV Spark</span>
        </Link>

        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-['Outfit'] mb-1">Welcome back</h2>
            <p className="text-[#475569] dark:text-slate-400 text-sm">Sign in to your account.</p>
          </div>

          {/* ── Two-tab switcher: Google | Email ── */}
          <div className="flex p-1 bg-[#F4F7F5] dark:bg-slate-800 rounded-2xl mb-6 gap-1 border border-[#E2E8F0] dark:border-slate-700">
            {([
              { id: 'google' as const, icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>, label: 'Google' },
              { id: 'email' as const, icon: <Mail className="w-4 h-4" />, label: 'Email' },
            ]).map(tab => (
              <button key={tab.id} onClick={() => { setMethod(tab.id); clearMessages() }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all
                  ${method === tab.id ? 'bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white shadow-sm border border-[#E2E8F0] dark:border-slate-600' : 'text-[#475569] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Google */}
            {method === 'google' && (
              <motion.div key="google" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <div className="p-8 text-center border border-[#E2E8F0] dark:border-slate-800 rounded-3xl bg-[#F4F7F5] dark:bg-slate-800/50">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white dark:bg-slate-700 border border-[#E2E8F0] dark:border-slate-600 flex items-center justify-center shadow-sm">
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">Continue with Google</h3>
                  <p className="text-sm text-[#475569] dark:text-slate-400 mb-5">Sign in instantly using your Google account.</p>
                  <button onClick={handleGoogle} disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-sm font-bold bg-white dark:bg-slate-700 border border-[#E2E8F0] dark:border-slate-600 hover:bg-[#F4F7F5] dark:hover:bg-slate-600 shadow-sm transition-all disabled:opacity-60 text-[#0F172A] dark:text-white">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in with Google'}
                  </button>
                </div>
                <ErrorBox />
              </motion.div>
            )}

            {/* Email & Password */}
            {method === 'email' && (
              <motion.div key="email" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300 mb-1.5">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300">Password</label>
                      <Link to="/forgot-password" className="text-xs text-[#059669] dark:text-[#10B981] hover:underline font-bold">Forgot password?</Link>
                    </div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                      className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 text-sm text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all" />
                  </div>
                  <ErrorBox />
                  <button type="submit" disabled={loading}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] hover:-translate-y-0.5 disabled:opacity-60 shadow-[0_4px_14px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
                  </button>
                  <p className="text-center text-sm text-[#475569] dark:text-slate-400 mt-5">
                    Don't have an account? <Link to="/signup" className="text-[#059669] dark:text-[#10B981] font-bold hover:underline">Sign up</Link>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
