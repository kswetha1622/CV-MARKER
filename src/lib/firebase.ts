import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
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
  apiKey: "AIzaSyAaBBAzFtSFlhTdE2ZsAZ6zwSxyJ_bcq6c",
  authDomain: "cv-spark-aa23e.firebaseapp.com",
  projectId: "cv-spark-aa23e",
  storageBucket: "cv-spark-aa23e.firebasestorage.app",
  messagingSenderId: "374632230959",
  appId: "1:374632230959:web:719111e5c5fc5bd7a116da",
  measurementId: "G-0M8XV8MJF5",
}

const app = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const db = getFirestore(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')
googleProvider.addScope('profile')
googleProvider.setCustomParameters({ prompt: 'select_account' })

export {
  signInWithPopup,
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
