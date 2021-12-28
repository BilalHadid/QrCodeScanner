import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCYTFsqRQQnM-3Nm0hbop08qYjgsheJvuA",
    authDomain: "reactnative-app-c8432.firebaseapp.com",
    databaseURL: "https://reactnative-app-c8432-default-rtdb.firebaseio.com",
    projectId: "reactnative-app-c8432",
    storageBucket: "reactnative-app-c8432.appspot.com",
    messagingSenderId: "262336098068",
    appId: "1:262336098068:web:d830ef235adfaa60af5c01",
    measurementId: "G-3W9C16224N"
  };

firebase.initializeApp(firebaseConfig)

export default firebase;


  