import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2, Sparkles } from 'lucide-react'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
          <Sparkles className="w-7 h-7 text-white animate-pulse" />
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading CV Spark...
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
