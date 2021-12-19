import type { NextPage } from 'next';
import Link from 'next/link';
import { DAYS } from '@/const/days';
import { PERIODS } from '@/const/periods';
import { Spacer } from '@/components/Spacer';
import { usePage } from './hook';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const Page: NextPage = () => {
  const { register, errors, onSubmit } = usePage();

  return (
    <Box sx={{ mt: 6, width: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography fontSize={20}>授業を登録</Typography>
      <Spacer h={20} />
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="授業名"
          {...register('name')}
          error={!!errors.name?.message}
          helperText={errors.name?.message ?? ''}
        />
        <FormControl fullWidth sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="dayId">曜日</InputLabel>
          <Select label="曜日" {...register('dayId')} sx={{ textAlign: 'left' }} error={!!errors.dayId?.message}>
            {DAYS.map((day, index) => (
              <MenuItem key={day} value={index}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="period">時限</InputLabel>
          <Select label="時限" {...register('period')} sx={{ textAlign: 'left' }} error={!!errors.period?.message}>
            {PERIODS.map((day, index) => (
              <MenuItem key={day} value={index + 1}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Spacer h={20} />
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
