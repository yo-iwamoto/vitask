import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { DAYS } from '@/const/days';
import { Empty } from '@/components/Empty';
import { Spacer } from '@/components/Spacer';
import { useAuth } from '@/hooks/useAuth';
import { Lecture, useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { Report, useReports } from '@/hooks/useReports';
import { dayjs } from '@/plugins/dayjs';
import { firestore } from '@/plugins/firebase';
import { styles } from '@/styles/dashboard';
import { Button, Typography } from '@mui/material';
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa';

const Page: NextPage = () => {
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

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={24} sx={{ fontWeight: 'bold' }}>
          Lectures
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {deleting !== 'lecture' && (
            <Link href="/new-lecture">
              <Button variant="contained">
                <FaPlus color="white" />
              </Button>
            </Link>
          )}
          <Spacer w={20} />
          {deleting === 'lecture' ? (
            <Button variant="contained" sx={{ backgroundColor: 'green' }} onClick={() => setDeleting(null)}>
              <FaCheck color="white" />
            </Button>
          ) : (
            <Button variant="contained" sx={{ backgroundColor: 'gray' }} onClick={() => setDeleting('lecture')}>
              <FaTrash color="white" />
            </Button>
          )}
        </div>
      </div>
      <ul>
        {lectures &&
          lectures.map((lecture) => (
            <li key={lecture.id} style={styles.lecture}>
              <p>{lecture.name}</p>
              {deleting === 'lecture' ? (
                <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <FaTrash size={24} color="red" style={{ cursor: 'pointer' }} onClick={() => deleteLecture(lecture)} />
                </div>
              ) : (
                <p>
                  {DAYS[lecture.dayId]} {lecture.period}限
                </p>
              )}
            </li>
          ))}
        {lectures?.length === 0 && <Empty>まだ講義がありません。まずは講義を登録しましょう。</Empty>}
      </ul>
      <hr style={styles.hr} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={24} sx={{ fontWeight: 'bold' }}>
          Reports
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {deleting !== 'report' && (
            <Link href="/new-report">
              <Button variant="contained">
                <FaPlus color="white" />
              </Button>
            </Link>
          )}
          <Spacer w={20} />
          {deleting === 'report' ? (
            <Button variant="contained" sx={{ backgroundColor: 'green' }} onClick={() => setDeleting(null)}>
              <FaCheck color="white" />
            </Button>
          ) : (
            <Button variant="contained" sx={{ backgroundColor: 'gray' }} onClick={() => setDeleting('report')}>
              <FaTrash color="white" />
            </Button>
          )}
        </div>
      </div>
      <ul>
        {reports &&
          reports.map((report) => (
            <li
              key={report.id}
              style={{
                ...styles.report,
                textDecoration: report.done ? 'line-through' : 'none',
                color: report.done ? 'grey' : 'black',
              }}
              onClick={deleting ? undefined : () => finishReport(report)}
            >
              <p>
                【{report.lectureName}】 {report.name}
              </p>
              {deleting === 'report' ? (
                <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                  <FaTrash size={24} color="red" style={{ cursor: 'pointer' }} onClick={() => deleteReport(report)} />
                </div>
              ) : (
                <p style={styles.date}>{dayjs(report.deadline.toDate()).format('M/D H:m')}</p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
