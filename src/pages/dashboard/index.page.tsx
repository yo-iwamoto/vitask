import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DAYS } from '@/const/days';
import { Spacer } from '@/components/Spacer';
import { usePage } from './hook';
import { functions } from '@/lib/firebase';
import { Box, Button, Card, Link as MuiLink, Typography } from '@mui/material';
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa';

const Page: NextPage = () => {
  const { lectures, deleteLecture, deleting, setDeleting, isNotifyAPIAuthorized, pushToRegisterPage } = usePage();

  const call = () => {
    functions.httpsCallable('test')();
  };

  return (
    <>
      <Button onClick={call}>送信</Button>
      {!isNotifyAPIAuthorized && (
        <Card sx={{ borderRadius: 2, backgroundColor: '#f4f4f4', p: 2, mt: 4 }}>
          <MuiLink onClick={pushToRegisterPage} sx={{ cursor: 'pointer', display: 'inline-block' }}>
            <Typography>🔔 LINE Notifyに登録して，授業後に通知を受け取る</Typography>
          </MuiLink>
        </Card>
      )}
      <Box sx={{ mt: 4, mx: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize={24} fontWeight="bold">
            Lectures
          </Typography>
          <Box display="flex" justifyContent="space-between">
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
          </Box>
        </Box>
        <Box component="ul">
          {lectures &&
            lectures.map((lecture) => (
              <Box
                component="li"
                key={lecture.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={4}
              >
                <Typography fontSize={16}>{lecture.name}</Typography>
                {deleting === 'lecture' ? (
                  <Box py={0.4} onClick={() => deleteLecture(lecture)}>
                    <FaTrash size={24} color="red" style={{ cursor: 'pointer' }} />
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                    <Typography paragraph sx={{ m: 0 }}>
                      {DAYS[lecture.dayId]} {lecture.period}限
                    </Typography>
                    <Button variant="outlined" startIcon={<FaPlus size={16} />}>
                      <Typography paragraph sx={{ m: 0 }}>
                        課題を追加
                      </Typography>
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          {lectures?.length == 0 && deleting !== 'lecture' && (
            <Box display="flex" flexDirection="column" textAlign="center">
              <Box sx={{ display: 'inline-block' }}>
                <Image src="/img/empty.png" width={300} height={300} />
              </Box>
              <Typography>まだ講義がありません。まずは講義を登録しましょう。</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Page;
