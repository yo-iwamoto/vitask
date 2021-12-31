import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFirebaseAuth } from './useFirebase';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = (require?: boolean) => {
  const router = useRouter();
  const auth = useFirebaseAuth();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user && require) {
        router.push('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user };
};
