import firebase from "firebase";

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
// import 'firebase/analytics'

var firebaseConfig = {
  apiKey: "AIzaSyAIBsCgLTU3OiUqq8wJYCl09bTFP4IHobo",
  authDomain: "aes-app-755d2.firebaseapp.com",
  databaseURL: "https://aes-app-755d2.firebaseio.com",
  projectId: "aes-app-755d2",
  storageBucket: "aes-app-755d2.appspot.com",
  messagingSenderId: "661443106335",
  appId: "1:661443106335:web:6de46bac7e3909d3a8272a",
  measurementId: "G-5DBVHXN2R8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage()

export {
    storage, firebase as default
}