import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAIOYZfIjl65AYUwL8eFInpD9kvrnn4084",
    authDomain: "socio-chat-541a7.firebaseapp.com",
    projectId: "socio-chat-541a7",
    storageBucket: "socio-chat-541a7.appspot.com",
    messagingSenderId: "624433207066",
    appId: "1:624433207066:web:efc31119af0374e0c73ea3",
    measurementId: "G-S8T12GSTK8"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;