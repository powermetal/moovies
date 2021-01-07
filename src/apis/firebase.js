import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDbLWCOM7IKKtB2K6bCy9UO0823G_4t1RQ",
    authDomain: "moovies-aa846.firebaseapp.com",
    projectId: "moovies-aa846",
    storageBucket: "moovies-aa846.appspot.com",
    messagingSenderId: "675305647374",
    appId: "1:675305647374:web:e95bc3552cbf1a3558fb5f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;