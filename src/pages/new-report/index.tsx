import { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MESSAGES } from '@/const/messages';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Spacer } from '@/components/Spacer';
import { useAuth } from '@/hooks/useAuth';
import { useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { dayjs } from '@/plugins/dayjs';
import { firestore } from '@/plugins/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const today = dayjs(new Date());

type Form = {
  lectureId: string;
  name: string;
  deadlineDate: string;
  deadlineTime: string;
};

const schema = yup
  .object()
  .required(MESSAGES.required)
  .shape({
    lectureId: yup.string().required(MESSAGES.required),
    name: yup.string().required(MESSAGES.required),
    deadlineDate: yup.string().required(MESSAGES.required).default(today.format('YYYY-MM-DD')),
    deadlineTime: yup.string().required(MESSAGES.required).default(today.format('hh:mm')),
  });

const Page: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth(true);

  const { withLoading } = useLoading();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      if (!user) return;

      const deadline = new Date(data.deadlineDate);
      deadline.setHours(Number(data.deadlineTime.slice(0, 2)));
      deadline.setMinutes(Number(data.deadlineTime.slice(3)));

      const lectureName = lectures?.find((l) => l.id === data.lectureId)?.name;
      if (!lectureName) return;

      await firestore.collection('reports').add({
        uid: user.uid,
        deadline,
        name: data.name,
        lectureId: data.lectureId,
        lectureName,
      });

      router.push('/dashboard');
    })
  );

  const { data: lectures } = useLectures();

  useEffect(() => {
    if (lectures?.length === 0) {
      setError('lectureId', { message: '選択できる授業がありません' });
    }
  }, [lectures]);

  return (
    <Box sx={{ mt: 4, width: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography fontSize={20}>レポートを登録</Typography>
      <Spacer h={20} />
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="lectureId">授業</InputLabel>
          <Select
            label="授業"
            {...register('lectureId')}
            sx={{ textAlign: 'left' }}
            error={!!errors.lectureId?.message}
          >
            {lectures &&
              lectures.map((lecture) => (
                <MenuItem key={lecture.name} value={lecture.id}>
                  {lecture.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <ErrorMessage>{errors.lectureId?.message}</ErrorMessage>
        <Spacer h={32} />
        <TextField
          fullWidth
          label="レポート名"
          {...register('name')}
          error={!!errors.name?.message}
          helperText={errors.name?.message ?? ''}
          defaultValue="レポート"
        />
        <Spacer h={32} />
        <TextField
          fullWidth
          label="締め切り日"
          type="date"
          {...register('deadlineDate')}
          defaultValue={today.format('YYYY-MM-DD')}
        />
        <Spacer h={32} />
        <TextField
          fullWidth
          label="締め切り時刻"
          type="time"
          {...register('deadlineTime')}
          defaultValue={today.format('hh:mm')}
        />
        <Spacer h={32} />
        <Button type="submit" variant="contained" size="large" sx={{ color: 'white' }}>
          登録
        </Button>
        <Spacer h={20} />
        <Link href="/dashboard">キャンセル</Link>
      </form>
    </Box>
  );
};

export default Page;
