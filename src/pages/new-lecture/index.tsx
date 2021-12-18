import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DAYS } from '@/const/days';
import { MESSAGES } from '@/const/messages';
import { PERIODS } from '@/const/periods';
import { Spacer } from '@/components/Spacer';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { auth, firestore } from '@/plugins/firebase';
import { styles } from '@/styles/new-lecture';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Form = {
  name: string;
  dayId: number;
  period: number;
};

const schema = yup
  .object()
  .required(MESSAGES.required)
  .shape({
    name: yup.string().required(MESSAGES.required),
    dayId: yup.number().required(MESSAGES.required),
    period: yup.number().required(MESSAGES.required),
  });

const Page: NextPage = () => {
  const router = useRouter();
  useAuth(true);

  const { withLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      await firestore.collection('lectures').add({ uid, ...data });
      router.push('/dashboard');
    })
  );

  return (
    <div style={styles.container}>
      <Typography fontSize={20}>授業を登録</Typography>
      <Spacer h={20} />
      <form onSubmit={onSubmit}>
        <TextField
          label="授業名"
          {...register('name')}
          sx={styles.textField}
          error={!!errors.name?.message}
          helperText={errors.name?.message ?? ''}
        />
        <FormControl fullWidth sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="dayId">曜日</InputLabel>
          <Select label="曜日" {...register('dayId')} sx={styles.select} error={!!errors.dayId?.message}>
            {DAYS.map((day, index) => (
              <MenuItem key={day} value={index}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="period">時限</InputLabel>
          <Select label="時限" {...register('period')} sx={styles.select} error={!!errors.period?.message}>
            {PERIODS.map((day, index) => (
              <MenuItem key={day} value={index + 1}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Spacer h={20} />
        <Button type="submit" variant="contained" size="large" sx={styles.submitButton}>
          登録
        </Button>
        <Spacer h={20} />
        <Link href="/dashboard">キャンセル</Link>
      </form>
    </div>
  );
};

export default Page;
