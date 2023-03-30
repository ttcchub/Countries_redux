// Import the functions you need from the SDKs you need
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { collection, getFirestore, addDoc} from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCayoc0mj1p6wMvI5FHxXCoNcVOYUotBTE',
  authDomain: 'countries-9ec50.firebaseapp.com',
  projectId: 'countries-9ec50',
  storageBucket: 'countries-9ec50.appspot.com',
  messagingSenderId: '624300795854',
  appId: '1:624300795854:web:57e722455e639ce0c4ed9f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error.message)
  }
}
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    // const q = query(collection(db, "users"), where("uid", "==", user.id))
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (error) {
    console.log(error)
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout }
