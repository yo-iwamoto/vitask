import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { firestore } from '@/plugins/firebase';
import type { Lecture } from '@/types';

export const useLectures = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Lecture[]>();

  const fetch = async () => {
    user &&
      firestore
        .collection('lectures')
        .where('uid', '==', user.uid)
        .get()
        .then((res) => {
          setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Lecture[]);
        });
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { data, mutate: fetch };
};
