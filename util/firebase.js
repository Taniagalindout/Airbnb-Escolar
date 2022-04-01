// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBrwes-e3iksHDTJyz4Sk_hpwabCYf96M",
  authDomain: "airbnb-a7a1d.firebaseapp.com",
  projectId: "airbnb-a7a1d",
  storageBucket: "airbnb-a7a1d.appspot.com",
  messagingSenderId: "897632563940",
  appId: "1:897632563940:web:dfb2c2cb5b8e86bceab2f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore()