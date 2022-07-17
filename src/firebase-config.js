// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfk22UY-T3TCyudjrG0HEsjeI3y1RrQRc",
  authDomain: "tech-incubator-5d61e.firebaseapp.com",
  projectId: "tech-incubator-5d61e",
  storageBucket: "tech-incubator-5d61e.appspot.com",
  messagingSenderId: "898924687434",
  appId: "1:898924687434:web:cda670f5270a4ce212b6b3",
  measurementId: "G-8N1MRVE4G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // establish a connection

export const db = getFirestore(app);              // use Firestore Database
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBfk22UY-T3TCyudjrG0HEsjeI3y1RrQRc",
//   authDomain: "tech-incubator-5d61e.firebaseapp.com",
//   projectId: "tech-incubator-5d61e",
//   storageBucket: "tech-incubator-5d61e.appspot.com",
//   messagingSenderId: "898924687434",
//   appId: "1:898924687434:web:cda670f5270a4ce212b6b3",
//   measurementId: "G-8N1MRVE4G9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);