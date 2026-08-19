import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = typeof location.state?.from === 'string'
    ? location.state.from
    : location.state?.from
      ? `${location.state.from.pathname}${location.state.from.search || ''}${location.state.from.hash || ''}`
      : '/builder'
  const { signupWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await signupWithEmail(email, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please go to Log in instead.')
      } else {
        setError(err?.message || 'Failed to create an account.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F4F7F5] dark:bg-slate-950 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'linear-gradient(rgba(209, 231, 221, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 231, 221, 0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#E2E8F0] dark:border-slate-800 relative z-10">
        
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">CV Spark</span>
        </Link>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-['Outfit'] mb-2">Create an account</h2>
          <p className="text-[#475569] dark:text-slate-400 text-sm">Join CV Spark and build your dream resume today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-[#0F172A] dark:text-white" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6} placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-[#0F172A] dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0F172A] dark:text-slate-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={6} placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 border border-[#E2E8F0] dark:border-slate-700 rounded-xl bg-[#F4F7F5] dark:bg-slate-800 focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition-all text-[#0F172A] dark:text-white" />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </motion.div>
          )}

          <button type="submit" disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] hover:-translate-y-0.5 disabled:opacity-60 shadow-[0_4px_14px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#475569] dark:text-slate-400">
          Already have an account? <Link to="/login" className="text-[#059669] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
