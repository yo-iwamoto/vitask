import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePage } from './hook';
import { Box, Typography } from '@mui/material';

const Page: NextPage = () => {
  const { signIn } = usePage();

  return (
    <>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 60 }}>vitask</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: 24 }}>
          <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>大学生のための</span>
          <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>簡単レポート管理術</span>
        </Typography>
        <Image src="/top.png" width={300} height={300} />
        <Box
          sx={{
            display: 'inline-block',
            cursor: 'pointer',
            p: 2,
            borderRadius: 4,
            boxShadow: 4,
            transition: 'all .1s',
            ':hover': { boxShadow: 2 },
          }}
          onClick={signIn}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/google-login.png" width={20} height={20} />
            <Box sx={{ pl: 1 }}>Googleでログイン</Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, height: 64, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link href="/privacy">個人情報保護方針</Link>
        </Box>
      </Box>
    </>
  );
};

export default Page;
