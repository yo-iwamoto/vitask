import { initializeApp } from 'firebase-admin';

const admin = initializeApp({});

const auth = admin.auth();
const firestore = admin.firestore();

export { auth, firestore };

export * as functions from 'firebase-functions';
