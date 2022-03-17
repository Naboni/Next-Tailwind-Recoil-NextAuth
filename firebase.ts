// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOlOB6QEGdp1VqQe7WgMW_mmy1QcrXZxU',
  authDomain: 'next-tailwind-1cf0b.firebaseapp.com',
  projectId: 'next-tailwind-1cf0b',
  storageBucket: 'next-tailwind-1cf0b.appspot.com',
  messagingSenderId: '1020423931513',
  appId: '1:1020423931513:web:69e81548393d92df0176a8',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
