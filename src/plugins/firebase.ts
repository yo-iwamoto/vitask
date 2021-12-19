import firebase from 'firebase';

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp({
        apiKey: 'AIzaSyDerS2KN0xDOILAgJb78f8JDma5EYHXiYQ',
        authDomain: 'vitask-dd803.firebaseapp.com',
        projectId: 'vitask-dd803',
        storageBucket: 'vitask-dd803.appspot.com',
        messagingSenderId: '362182604559',
        appId: '1:362182604559:web:48992e5cba486e465d307a',
      })
    : firebase.app();

export const auth = app.auth();
export const firestore = app.firestore();
const functions = app.functions();
functions.useEmulator('localhost', 5001);
export { functions };

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
