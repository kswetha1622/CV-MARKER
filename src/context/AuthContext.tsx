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
import {
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

// Detect mobile browsers — popups are blocked on mobile, so we use redirect
const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

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
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    // Handle redirect result (for mobile Google sign-in)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // Send verification email silently (may be skipped for Google accounts)
          sendEmailVerification(result.user).catch(() => {})
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.error('Redirect result error:', err)
      })

    return () => unsubscribe()
  }, [navigate])

  const loginWithGoogle = async () => {
    if (isMobile()) {
      // Mobile: use redirect (popup is blocked on mobile browsers)
      await signInWithRedirect(auth, googleProvider)
      // Navigation handled in useEffect via getRedirectResult
    } else {
      // Desktop: use popup for better UX
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user) {
        // Send confirmation email silently
        sendEmailVerification(result.user).catch(() => {})
        navigate('/dashboard')
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
