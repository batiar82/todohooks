// import * as firebase from "firebase/firebase-app";
import firebase from 'firebase'
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAmCOOhn_ZjiiB4R-ipqdSTpnjzfzcWWug",
    authDomain: "todolist-4d5bb.firebaseapp.com",
    databaseURL: "https://todolist-4d5bb.firebaseio.com",
    projectId: "todolist-4d5bb",
    storageBucket: "todolist-4d5bb.appspot.com",
    messagingSenderId: "446642728201",
    appId: "1:446642728201:web:7b071ce17783c4f33df7d8"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
//   firebase.analytics()
export default firebase;