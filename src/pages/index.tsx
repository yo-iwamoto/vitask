import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { styles } from '@/styles/index';
import { Button, Typography } from '@mui/material';

const Page: NextPage = () => {
  return (
    <div style={styles.container}>
      <Typography sx={styles.title}>vitask</Typography>
      <Typography fontSize={24} sx={{ textAlign: 'center' }}>
        <span style={{ whiteSpace: 'nowrap' }}>大学生のための</span>
        <span style={{ whiteSpace: 'nowrap' }}>簡単レポート管理術</span>
      </Typography>
      <Image src="/top.png" width={300} height={300} />
      <Link href="/signup">
        <Button type="button" variant="contained" sx={styles.button} size="large">
          はじめる
        </Button>
      </Link>
    </div>
  );
};

export default Page;
