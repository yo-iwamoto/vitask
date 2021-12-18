import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLoading } from '@/hooks/useLoading';
import { auth, googleAuthProvider } from '@/plugins/firebase';
import { Box, Typography } from '@mui/material';

const Page: NextPage = () => {
  const router = useRouter();
  const { withLoading } = useLoading();

  const signInWithGoogle = () =>
    withLoading(async () => {
      const res = await auth.signInWithPopup(googleAuthProvider).catch((_err) => alert('サインインに失敗しました'));
      if (!res) return;

      router.push('/dashboard');
    });

  return (
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
        <Typography paragraph noWrap fontSize={20} sx={{ display: 'inline' }}>
          大学生のための
        </Typography>
        <Typography paragraph noWrap fontSize={20} sx={{ display: 'inline' }}>
          簡単レポート管理術
        </Typography>
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
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={signInWithGoogle}>
          <Image src="/google-login.png" width={20} height={20} />
          <Box sx={{ pl: 1 }}>Googleでログイン</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
