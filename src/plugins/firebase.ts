import firebase from 'firebase';

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp({
        apiKey: 'AIzaSyCWCMOpkTSfpf8sgS6eU5XBYpXc1eVm1tY',
        authDomain: 'report-manager-3480d.firebaseapp.com',
        projectId: 'report-manager-3480d',
        storageBucket: 'report-manager-3480d.appspot.com',
        messagingSenderId: '105914103596',
        appId: '1:105914103596:web:5d152a68aa5a1f3f731e89',
      })
    : firebase.app();

export const auth = app.auth();
export const firestore = app.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
