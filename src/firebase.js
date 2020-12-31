import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDBWo1Q_KDkjPkVITx9JNhrpJH5d3nNMbg",
    authDomain: "imessage-clone-44c71.firebaseapp.com",
    projectId: "imessage-clone-44c71",
    storageBucket: "imessage-clone-44c71.appspot.com",
    messagingSenderId: "7526561092",
    appId: "1:7526561092:web:277bcc693e3d1d24025311"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;