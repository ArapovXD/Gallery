import firebase from 'firebase/app';
import storage from 'firebase/storage';
import firestore from 'firebase/firestore';
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyByFtDPoH-YWg6kTcEqEt0Zhotx6tDfBhU",
    authDomain: "gallery-7c416.firebaseapp.com",
    projectId: "gallery-7c416",
    storageBucket: "gallery-7c416.appspot.com",
    messagingSenderId: "877714510589",
    appId: "1:877714510589:web:58576f3690580ae435e494"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectStorage, projectFirestore, timestamp};