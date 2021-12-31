import { useEffect } from 'react';
import { app } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

export const useFirebaseAuth = () => {
  return getAuth(app);
};

export const useFirestore = () => {
  return getFirestore(app);
};

export const useFirebaseFunctions = () => {
  const functions = getFunctions(app, 'asia-northeast2');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  }, []);

  return functions;
};
