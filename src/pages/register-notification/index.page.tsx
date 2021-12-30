import type { NextPage } from 'next';
import Image from 'next/image';
import { usePage } from './hook';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';

const Page: NextPage = () => {
  const { redirect } = usePage();

  return (
    <Box textAlign="center">
      <Typography fontSize={24} fontWeight="bold" my={4}>
        LINE Notifyの友達登録
      </Typography>
      <Box my={2}>
        <Typography>毎日、最後の授業が終わった直後に LINE Notify を通じて通知を行います。</Typography>
        <Typography>まずは以下のQRまたはリンクから LINE Notify を友達登録してください。</Typography>
      </Box>
      <Box>
        <Image src="/img/line_notify.png" height={120} width={120} />
      </Box>
      <MuiLink href="https://line.me/R/ti/p/@linenotify" target="_blank">
        https://line.me/R/ti/p/@linenotify
      </MuiLink>
      <Box mt={6} mb={3}>
        <Typography>友達登録が完了したら、vitaskの登録を行います。以下のボタンをクリックしてください。</Typography>
      </Box>
      <Button onClick={redirect} variant="contained" sx={{ color: 'white', fontWeight: 'bold' }}>
        登録
      </Button>
    </Box>
  );
};

export default Page;
