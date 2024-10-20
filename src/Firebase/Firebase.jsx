import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';




const firebaseConfig = {
  apiKey: "AIzaSyAaS0fiT5-ZaV4ALuZlUNAv51czUsGYO4I",
  authDomain: "buckettalk-3f64d.firebaseapp.com",
  projectId: "buckettalk-3f64d",
  storageBucket: "buckettalk-3f64d.appspot.com",
  messagingSenderId: "659568725504",
  appId: "1:659568725504:web:d77936d7e60f92ca7ad2e5",
  measurementId: "G-L2KX2EFF14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};