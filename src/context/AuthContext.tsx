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
  signInWithRedirect,
  getRedirectResult,
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
    // Check for Google redirect result first (after Google redirects back to app)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // Optionally send verification email (Firebase skips for Google accounts)
          sendEmailVerification(result.user).catch(() => {})
          navigate('/dashboard', { replace: true })
        }
      })
      .catch((err) => {
        console.error('Google redirect result error:', err)
      })

    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  // Google Sign-In — always uses redirect (works on ALL browsers, no popup blocking)
  const loginWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider)
    // After redirect, Google sends user back to the app.
    // getRedirectResult() in useEffect above will handle navigation.
  }

  // Email/Password Sign-Up
  const signupWithEmail = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    await sendEmailVerification(userCredential.user)
    navigate('/dashboard')
  }

  // Email/Password Login
  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass)
    navigate('/dashboard')
  }

  // Forgot Password
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  // Logout
  const logout = async () => {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        signupWithEmail,
        loginWithEmail,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
