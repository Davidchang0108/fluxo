import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfCgUSOepM-sdtdBtFS61YMAr-T2a3GMU",
  authDomain: "fluxo-d2cd1.firebaseapp.com",
  projectId: "fluxo-d2cd1",
  storageBucket: "fluxo-d2cd1.firebasestorage.app",
  messagingSenderId: "543766961721",
  appId: "1:543766961721:web:04f00773a58ba25c9377e8",
  measurementId: "G-V605NMQDBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);