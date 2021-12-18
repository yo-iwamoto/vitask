import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spacer } from '@/components/Spacer';
import { styles } from '@/styles/index';
import { Button, Typography } from '@mui/material';

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <Typography sx={styles.title}>すごい課題通知</Typography>
      <Spacer h={60} />
      <Button type="button" variant="contained" sx={styles.button} size="large" onClick={() => router.push('/signup')}>
        はじめる
      </Button>
    </div>
  );
};

export default Page;
