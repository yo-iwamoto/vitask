import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { useNotifyAPIAuthorization } from '@/hooks/useNotifyAPIAuthorization';
import { useToast } from '@/hooks/useToast';
import { firestore } from '@/lib/firebase';
import type { Lecture } from '@/types';

export const usePage = () => {
  const router = useRouter();

  const { withLoading } = useLoading();

  const { showToast } = useToast();

  useAuth(true);

  const { data: lectures, mutate: mutateLectures } = useLectures();

  const deleteLecture = async (lecture: Lecture) => {
    withLoading(async () => {
      await firestore.collection('lectures').doc(lecture.id).delete();
      showToast({ severity: 'error', message: '講義を削除しました' });
      await mutateLectures();
    });
  };

  const [deleting, setDeleting] = useState<'report' | 'lecture' | null>(null);

  const { isNotifyAPIAuthorized } = useNotifyAPIAuthorization();

  const pushToRegisterPage = () => {
    router.push('/register-notification');
  };

  return {
    lectures,
    deleteLecture,
    deleting,
    setDeleting,
    isNotifyAPIAuthorized,
    pushToRegisterPage,
  };
};
