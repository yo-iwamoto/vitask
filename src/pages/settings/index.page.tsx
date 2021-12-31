import type { NextPage } from 'next';
import Link from 'next/link';
import { usePage } from './hook';
import { Box, Button, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';

const Page: NextPage = () => {
  const { isNotifyAPIAuthorized, onClickRevokeButton } = usePage();

  return (
    <Box>
      <Typography fontSize={24} fontWeight="bold" textAlign="center" mt={4} mb={2}>
        設定
      </Typography>
      <Divider />
      <Box component="section" my={4} mx="auto" maxWidth={420}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography fontSize={20} fontWeight="bold">
            通知設定
          </Typography>
          <Tooltip title="講義が登録されている日に、最後の講義終了後に課題を登録するよう、LINE Notifyを通じて通知を送信します。">
            <IconButton>
              <FaQuestionCircle color="#999999" size={18} />
            </IconButton>
          </Tooltip>
        </Box>
        {isNotifyAPIAuthorized ? (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>設定済み</Typography>
            <Button color="error" variant="outlined" onClick={onClickRevokeButton}>
              解除
            </Button>
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>未設定</Typography>
            <Link href="/register-notification">
              <Button variant="contained" sx={{ color: 'white' }}>
                設定
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Page;
