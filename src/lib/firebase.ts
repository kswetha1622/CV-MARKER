import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAaBBAzFtSFlhTdE2ZsAZ6zwSxyJ_bcq6c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cv-spark-aa23e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cv-spark-aa23e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cv-spark-aa23e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "374632230959",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:374632230959:web:719111e5c5fc5bd7a116da",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0M8XV8MJF5",
}

const app = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const db = getFirestore(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export {
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  type User,
}
