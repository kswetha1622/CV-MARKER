import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

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
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('cv_spark_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const setAndSaveUser = (newUser: User) => {
    setUser(newUser)
    localStorage.setItem('cv_spark_user', JSON.stringify(newUser))
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    setTimeout(() => {
      setAndSaveUser({
        uid: 'google_' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: null,
        phoneNumber: null,
      })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  const signupWithEmail = async (email: string, pass: string) => {
    setLoading(true)
    setTimeout(() => {
      setAndSaveUser({
        uid: 'email_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        phoneNumber: null,
      })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true)
    setTimeout(() => {
      setAndSaveUser({
        uid: 'email_' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        phoneNumber: null,
      })
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  const resetPassword = async (email: string) => {
    return new Promise<void>((resolve) => setTimeout(resolve, 500))
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('cv_spark_user')
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
