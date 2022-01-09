import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@/components/Menu';
import { Toast } from '@/components/Toast';
import { useHooks } from './Layout.hook';
import { css } from '@emotion/react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ClockLoader } from 'react-spinners';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }) => {
  const { isLoading, user } = useHooks();

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={user ? '/dashboard' : '/'}>
            <a>
              <Image src="/img/vitask_logo.png" height={40} width={100} />
            </a>
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
            background-color: #fdc731;
          `}
        />
      )}
      <Toast />
    </>
  );
};
