// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR-brXs_-mGS7vAeSHifU9-qbu0nGp5ko",
  authDomain: "react-http-da16e.firebaseapp.com",
  databaseURL: "https://react-http-da16e-default-rtdb.firebaseio.com",
  projectId: "react-http-da16e",
  storageBucket: "react-http-da16e.appspot.com",
  messagingSenderId: "363462755649",
  appId: "1:363462755649:web:68d6a5ad002bea10c5cdc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;