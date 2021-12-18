import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { firestore } from '@/plugins/firebase';
import firebase from 'firebase';

export type Report = {
  id: string;
  lectureId: string;
  lectureName: string;
  uid: string;
  name: string;
  deadline: firebase.firestore.Timestamp;
  done: boolean;
};

export const useReports = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Report[]>();

  const fetch = async () => {
    user &&
      firestore
        .collection('reports')
        .where('uid', '==', user.uid)
        .get()
        .then((res) => {
          const dataset = res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Report[];
          setData(dataset);
        });
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { data, mutate: fetch };
};
