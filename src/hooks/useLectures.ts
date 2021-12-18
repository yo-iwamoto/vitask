import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { firestore } from '@/plugins/firebase';

export type Lecture = {
  id: string;
  uid: string;
  name: string;
  dayId: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  period: 1 | 2 | 3 | 4 | 5 | 6;
};

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
          const dataset = res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Lecture[];
          setData(dataset);
        });
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { data, mutate: fetch };
};
