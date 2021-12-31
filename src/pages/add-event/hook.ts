import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFirestore } from '@/hooks/useFirebase';
import { Lecture } from '@/types';
import { collection, doc, getDoc } from 'firebase/firestore';

export const usePage = () => {
  const router = useRouter();
  const firestore = useFirestore();

  const [lectureId, setLectureId] = useState<string>();

  useEffect(() => {
    const parameter = router.query.lecture;
    if (typeof parameter !== 'string') {
      return;
    }

    setLectureId(parameter);
  }, [router.query]);

  const [lecture, setLecture] = useState<Lecture>();

  const fetchLecture = async () => {
    if (!lectureId) {
      return;
    }

    const res = await getDoc(doc(collection(firestore, 'lectures'), lectureId));
    if (!res.exists) {
      alert('URLが無効です');
      await router.push('/add-event');
      return;
    }

    setLecture({ ...res.data(), id: res.id } as Lecture);
  };

  useEffect(() => {
    fetchLecture();
  }, [lectureId]);

  return {
    lecture,
  };
};
