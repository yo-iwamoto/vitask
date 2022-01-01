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
        <Image src="/img/vitask_logo.png" height={60} width={150} />
        <Typography my={3} textAlign="center" fontSize={24}>
          <Box component="span" display="inline" whiteSpace="nowrap">
            大学生のための
          </Box>
          <Box component="span" display="inline" whiteSpace="nowrap">
            簡単レポート管理術
          </Box>
        </Typography>
        <Box sx={{ transform: 'translateY(-40px)' }}>
          <Image src="/img/top.png" width={300} height={300} />
        </Box>
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
            <Image src="/img/google-login.png" width={20} height={20} />
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
