import { getApps, getApp, initializeApp } from 'firebase/app';

export const app = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: 'AIzaSyDerS2KN0xDOILAgJb78f8JDma5EYHXiYQ',
      authDomain: 'vitask-dd803.firebaseapp.com',
      projectId: 'vitask-dd803',
      storageBucket: 'vitask-dd803.appspot.com',
      messagingSenderId: '362182604559',
      appId: '1:362182604559:web:48992e5cba486e465d307a',
    });
