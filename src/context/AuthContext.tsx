import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  googleProvider,
  signInWithRedirect,
  getRedirectResult,
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
    
    // Check for redirect result on mount
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        navigate('/dashboard')
      }
    }).catch(console.error)

    return () => unsubscribe()
  }, [navigate])

  const loginWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider)
    // The redirect happens automatically, navigation is handled in useEffect
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
