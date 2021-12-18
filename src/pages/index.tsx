import type { NextPage } from 'next';
import Link from 'next/link';
import { Spacer } from '@/components/Spacer';
import { styles } from '@/styles/index';
import { Button, Typography } from '@mui/material';

const Page: NextPage = () => {
  return (
    <div style={styles.container}>
      <Typography sx={styles.title}>vitask</Typography>
      <Spacer h={60} />
      <Link href="/signup">
        <Button type="button" variant="contained" sx={styles.button} size="large">
          はじめる
        </Button>
      </Link>
    </div>
  );
};

export default Page;
