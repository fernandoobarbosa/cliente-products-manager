
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyChpUrZPglaB-LSbpMwnd5PJkwZddBIyv4',
  authDomain: 'calcium-petal-305118.firebaseapp.com',
  projectId: 'calcium-petal-305118',
  storageBucket: 'calcium-petal-305118.appspot.com',
  messagingSenderId: '383562670198',
  appId: '1:383562670198:web:4278def66f0a90a09eff57'
}
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig)
