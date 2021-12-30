import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import firebase from 'firebase';

export const useAuth = (require?: boolean) => {
  const router = useRouter();

  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
