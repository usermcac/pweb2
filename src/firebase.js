import firebase from "firebase";
import axios from 'axios';
require("firebase/auth");
require("firebase/firestore");
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
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); 

firebase.auth().onAuthStateChanged(function(user) {        
  var name, email, photoUrl, uid, emailVerified, provider;

  if (user) {
    var isAnonymous = user.isAnonymous;
    if(isAnonymous){
      name = user.uid;
      email = user.uid;
      photoUrl = "n/d";
      emailVerified = user.emailVerified;
      uid = user.uid;        
      provider = "web";     
      
      localStorage.setItem("api_stat", "0");
      
    }
    else{
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  
      user.providerData.forEach(function (profile) {
      provider = profile.providerId;                              
      });  
      localStorage.setItem("api_stat", "1");
    }
      
    // handle jwttoken
    axios.post('https://app.movilaeswebdes.com/auth/register', {
          email: email,
          firebase_uuid: uid,
          last_name: "n/d",
          name:name,
          password:uid,
          phone_language: "es",
          provider:provider,
          push_tok:"n/d",
          pic_url:photoUrl
    },
    {
      headers: {            
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }    
  }
    )
    .then(function (response) {          
      localStorage.setItem("token", response.data.auth_token);      
      localStorage.setItem("paths", []);            
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else{    
    firebase.auth().signInAnonymously().catch(function(error) {      
      var errorCode = error.code;
      var errorMessage = error.message;    
      console.log(errorCode);
      console.log(errorMessage);       
    }); 
    
  }
  //handle APIJWT Token
  

  

}
);

 
  
 
  
  




export {
    storage, firebase as default
}