// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_vJvp4CEKlHnVKxfyVUkOeIEfFEuovs",
  authDomain: "tech-net-c3668.firebaseapp.com",
  projectId: "tech-net-c3668",
  storageBucket: "tech-net-c3668.appspot.com",
  messagingSenderId: "182532719014",
  appId: "1:182532719014:web:0bcabb1c6ec5806b298f67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);