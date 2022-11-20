import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4CRy_SVDh1HThrDz6JF2Md6CoNAJrWxE",
  authDomain: "zeams-69c66.firebaseapp.com",
  projectId: "zeams-69c66",
  storageBucket: "zeams-69c66.appspot.com",
  messagingSenderId: "259227031088",
  appId: "1:259227031088:web:8e15e6f1d604b2f6827ff5",
  measurementId: "G-R6YYB2QBZK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
