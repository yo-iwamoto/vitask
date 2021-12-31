import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirebase';
import { useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { useNotifyAPIAuthorization } from '@/hooks/useNotifyAPIAuthorization';
import { useToast } from '@/hooks/useToast';
import type { Lecture } from '@/types';
import { collection, deleteDoc, doc } from 'firebase/firestore';

export const usePage = () => {
  const { withLoading } = useLoading();
  const firestore = useFirestore();

  const { showToast } = useToast();

  useAuth(true);

  const { data: lectures, mutate: mutateLectures } = useLectures();

  const deleteLecture = async (lecture: Lecture) => {
    withLoading(async () => {
      await deleteDoc(doc(collection(firestore, 'lectures'), lecture.id));
      showToast({ severity: 'error', message: '講義を削除しました' });
      await mutateLectures();
    });
  };

  const [deleting, setDeleting] = useState<'report' | 'lecture' | null>(null);

  const { isNotifyAPIAuthorized } = useNotifyAPIAuthorization();

  const [closeNotifySuggestion, setCloseNotifySuggestion] = useState(false);

  useEffect(() => {
    const closeSetting = localStorage.getItem('close_notify_suggestion');
    if (closeSetting === 'true') {
      setCloseNotifySuggestion(true);
    }
  }, []);

  const close = () => {
    localStorage.setItem('close_notify_suggestion', 'true');
    setCloseNotifySuggestion(true);
  };

  return {
    lectures,
    deleteLecture,
    deleting,
    setDeleting,
    isNotifyAPIAuthorized,
    closeNotifySuggestion,
    close,
  };
};
