import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAjvRBisie8nUeFd4tyCMXBNyuYqM1lSm0",
  authDomain: "instagram-auth-development.firebaseapp.com",
  databaseURL: "https://instagram-auth-development.firebaseio.com",
  projectId: "instagram-auth-development",
  storageBucket: "instagram-auth-development.appspot.com",
  messagingSenderId: "910661957193",
  appId: "1:910661957193:web:ea3d6816363f7c66b63198"
})

export const auth = app.auth()
export default app
