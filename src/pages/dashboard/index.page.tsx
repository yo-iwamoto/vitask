import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DAYS } from '@/const/days';
import { Spacer } from '@/components/Spacer';
import { usePage } from './hook';
import { dayjs } from '@/plugins/dayjs';
import { Box, Button, Typography } from '@mui/material';
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa';

const Page: NextPage = () => {
  const { lectures, reports, deleteLecture, finishReport, deleteReport, deleting, setDeleting } = usePage();

  return (
    <Box sx={{ mt: 4, mx: 4 }}>
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
            <li key={lecture.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        {lectures?.length === 0 && deleting !== 'lecture' && (
          <Box style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Box sx={{ display: 'inline-block' }}>
              <Image src="/empty.png" width={300} height={300} />
            </Box>
            <p>まだ講義がありません。まずは講義を登録しましょう。</p>
          </Box>
        )}
      </ul>
      <Box sx={{ my: 4 }}>
        <hr />
      </Box>
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
            <Box
              key={report.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
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
                <p style={{ letterSpacing: 3 }}>{dayjs(report.deadline.toDate()).format('M/D H:m')}</p>
              )}
            </Box>
          ))}
      </ul>
    </Box>
  );
};

export default Page;
