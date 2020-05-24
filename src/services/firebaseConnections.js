import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: 'AIzaSyCYtF6bXpvO4AvGnaSINOGM0DJFMABUgUI',
  authDomain: 'myapp-66df2.firebaseapp.com',
  databaseURL: 'https://myapp-66df2.firebaseio.com',
  projectId: 'myapp-66df2',
  storageBucket: 'myapp-66df2.appspot.com',
  messagingSenderId: '499861521724',
  appId: '1:499861521724:web:9b5bb541b649c7c1f68a39',
  measurementId: 'G-9E3P9GCEL4',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
