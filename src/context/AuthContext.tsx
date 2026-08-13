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

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Google Sign-In with popup
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user) {
        // Send welcome verification email (Firebase may skip if already verified)
        try {
          await sendEmailVerification(result.user)
        } catch {
          // Silently ignore – Google accounts are pre-verified by Google
        }
        navigate('/dashboard')
      }
    } catch (err: any) {
      // Re-throw so the UI can display the error
      throw err
    }
  }

  // Email/Password Sign-Up
  const signupWithEmail = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass)
    // Send verification email to the new user
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
