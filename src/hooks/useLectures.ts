import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from './useFirebase';
import type { Lecture } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const getQuery = (instance: Firestore, uid: string) => query(collection(instance, 'lectures'), where('uid', '==', uid));

export const useLectures = () => {
  const { user } = useAuth();
  const firestore = useFirestore();

  const [data, setData] = useState<Lecture[]>();

  const fetch = async () => {
    if (!user) {
      return;
    }

    const res = await getDocs(getQuery(firestore, user.uid));
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Lecture[]);
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { data, mutate: fetch };
};
