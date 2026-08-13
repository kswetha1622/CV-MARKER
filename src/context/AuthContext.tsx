import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  type User,
} from '../lib/firebase'
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    
    // Attempt to send a verification email if requested by the user.
    // Note: Firebase usually marks Google accounts as already verified,
    // but we will trigger this anyway to fulfill the confirmation email request.
    try {
      if (result.user && !result.user.emailVerified) {
        await sendEmailVerification(result.user)
      } else if (result.user) {
        // Even if verified, we forcefully send it if possible, though Firebase might ignore it.
        await sendEmailVerification(result.user)
      }
    } catch (err) {
      console.log('Confirmation email sending skipped or not allowed by Firebase for Google accounts:', err)
    }

    navigate('/dashboard')
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
