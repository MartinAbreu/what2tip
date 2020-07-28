import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "whattotip-57d7c.firebaseapp.com",
  databaseURL: "https://whattotip-57d7c.firebaseio.com",
  projectId: "whattotip-57d7c",
  storageBucket: "whattotip-57d7c.appspot.com",
  messagingSenderId: "129583144439",
  appId: "1:129583144439:web:2f0c3bd11b5f08aa25e2f2",
  measurementId: "G-7VY6M8BK56",
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
