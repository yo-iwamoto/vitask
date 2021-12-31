import Link from 'next/link';
import { Menu } from '@/components/Menu';
import { Toast } from '@/components/Toast';
import { useHooks } from './Layout.hook';
import { css } from '@emotion/react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { ClockLoader } from 'react-spinners';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }) => {
  const { isLoading, user } = useHooks();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={user ? '/dashboard' : '/'}>
            <Typography fontSize={24} color="white" fontWeight="bold" style={{ cursor: 'pointer' }}>
              ⏰ vitask
            </Typography>
          </Link>
          {user && <Menu />}
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Box sx={{ py: 8, px: 2 }}>{children}</Box>
      </Box>
      {isLoading && (
        <ClockLoader
          color={'#ffffff'}
          css={css`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 4;
            background-color: #80c0e0;
          `}
        />
      )}
      <Toast />
    </>
  );
};
