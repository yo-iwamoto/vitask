import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Lecture, useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { Report, useReports } from '@/hooks/useReports';
import { firestore } from '@/plugins/firebase';

export const usePage = () => {
  const { withLoading } = useLoading();

  useAuth(true);

  const { data: reports, mutate: mutateReports } = useReports();
  const { data: lectures, mutate: mutateLectures } = useLectures();

  const finishReport = (report: Report) =>
    withLoading(async () => {
      const res = await firestore.collection('reports').doc(report.id).get();
      res.exists && (await res.ref.set({ done: !report.done }, { merge: true }));
      await mutateReports();
    });

  const deleteReport = async (report: Report) => {
    withLoading(async () => {
      await firestore.collection('reports').doc(report.id).delete();
      await mutateReports();
    });
  };

  const deleteLecture = async (lecture: Lecture) => {
    withLoading(async () => {
      await firestore.collection('lectures').doc(lecture.id).delete();
      await mutateLectures();
    });
  };

  const [deleting, setDeleting] = useState<'report' | 'lecture' | null>(null);

  return {
    lectures,
    reports,
    finishReport,
    deleteReport,
    deleteLecture,
    deleting,
    setDeleting,
  };
};
