import Link from 'next/link';
import { useHooks } from './Layout.hook';
import { css } from '@emotion/react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import { ClockLoader } from 'react-spinners';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }) => {
  const { isLoading, user, signOut } = useHooks();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={user ? '/dashboard' : '/'}>
            <Typography fontSize={24} style={{ color: 'white', cursor: 'pointer' }}>
              vitask
            </Typography>
          </Link>
          {user && <FaSignOutAlt color="white" onClick={() => signOut()} style={{ cursor: 'pointer' }} />}
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ py: 8, px: 2 }}>{children}</Box>
      </main>
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
    </>
  );
};
