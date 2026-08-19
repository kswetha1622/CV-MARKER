import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  type User,
} from '../lib/firebase'
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  browserPopupRedirectResolver,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  loading: boolean
  loginWithGoogle: () => Promise<void>
  signupWithEmail: (email: string, pass: string) => Promise<void>
  loginWithEmail: (email: string, pass: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => {},
  signupWithEmail: async () => {},
  loginWithEmail: async () => {},
  resetPassword: async () => {},
  logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Handle redirect result when user comes back from Google
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          sendEmailVerification(result.user).catch(() => {})
          navigate('/dashboard', { replace: true })
        }
      })
      .catch((err) => {
        console.error('Redirect error:', err?.code, err?.message)
      })

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [navigate])

  const loginWithGoogle = async () => {
    try {
      // Try popup first — if blocked, fall back to redirect
      const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver)
      if (result?.user) {
        sendEmailVerification(result.user).catch(() => {})
        navigate('/dashboard', { replace: true })
      }
    } catch (err: any) {
      if (
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request'
      ) {
        // Fallback to redirect when popup is blocked
        await signInWithRedirect(auth, googleProvider, browserPopupRedirectResolver)
      } else {
        throw err
      }
    }
  }

  const signupWithEmail = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    await sendEmailVerification(userCredential.user)
    navigate('/dashboard')
  }

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass)
    navigate('/dashboard')
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, signupWithEmail, loginWithEmail, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
