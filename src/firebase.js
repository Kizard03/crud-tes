import  firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyC0URdBqP9DzWbX98h0Ahu0fwrJQODyBF0",
  authDomain: "crud-project-d5c0f.firebaseapp.com",
  projectId: "crud-project-d5c0f",
  storageBucket: "crud-project-d5c0f.appspot.com",
  messagingSenderId: "479739564236",
  appId: "1:479739564236:web:62cbb57bc4867134ba7269",
  measurementId: "G-GSE7S9MN5G"
  }


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const db = firebaseApp.firestore();
  