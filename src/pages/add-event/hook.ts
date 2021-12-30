import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '@/plugins/firebase';
import { Lecture } from '@/types';

export const usePage = () => {
  const router = useRouter();

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

    const res = await firestore.collection('lectures').doc(lectureId).get();
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
