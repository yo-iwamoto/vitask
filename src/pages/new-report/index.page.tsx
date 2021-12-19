import type { NextPage } from 'next';
import Link from 'next/link';
import { Spacer } from '@/components/Spacer';
import { usePage } from './hook';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FaBellSlash } from 'react-icons/fa';

const Page: NextPage = () => {
  const { lectures, register, errors, onSubmit } = usePage();

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
            defaultValue=""
          >
            {lectures &&
              lectures.map((lecture) => (
                <MenuItem key={lecture.name} value={lecture.id}>
                  {lecture.name}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText error={!!errors.lectureId}>{errors.lectureId?.message}</FormHelperText>
        </FormControl>
        <Spacer h={32} />
        <TextField
          fullWidth
          label="レポート名"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message ?? ''}
          defaultValue="レポート"
        />
        <Spacer h={32} />
        <TextField fullWidth label="締め切り日" type="date" {...register('deadlineDate')} />
        <Spacer h={32} />
        <TextField fullWidth label="締め切り時刻" type="time" {...register('deadlineTime')} />
        <Spacer h={32} />
        <FormControl fullWidth>
          <InputLabel htmlFor="lectureId">通知</InputLabel>
          <Select
            label="通知"
            {...register('lectureId')}
            sx={{ textAlign: 'left' }}
            error={!!errors.notification}
            defaultValue="1"
          >
            {[
              <>
                <FaBellSlash />
                <span style={{ paddingLeft: 4 }}>通知しない</span>
              </>,
              '30分前',
              '1時間前',
              '3時間前',
              '6時間前',
              '12時間前',
              '1日前',
            ].map((choice, i) => (
              <MenuItem key={choice.toString()} value={i}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
