import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyC-yuUtOfGqNEUoazos_6P5PGUiJjVJxtE",
  authDomain: "test-ac325.firebaseapp.com",
  databaseURL: "https://test-ac325-default-rtdb.firebaseio.com",
  projectId: "test-ac325",
  storageBucket: "test-ac325.appspot.com",
  messagingSenderId: "793882151042",
  appId: "1:793882151042:web:5242862f9d7c88b55fcc9b",
  measurementId: "G-6NB71C1WYS"
};

// Initialize Firebase
firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig);

export default firebase
