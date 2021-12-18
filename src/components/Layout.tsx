import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { globalState } from '@/state/global';
import { auth } from '@/plugins/firebase';
import { css } from '@emotion/react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import { ClockLoader } from 'react-spinners';
import { useRecoilValue } from 'recoil';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }) => {
  const { isLoading } = useRecoilValue(globalState);
  const { user } = useAuth();

  const { withLoading } = useLoading();

  const signOut = () => withLoading(async () => await auth.signOut());

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={24} style={{ color: 'white' }}>
            vitask
          </Typography>
          {user && <FaSignOutAlt color="white" onClick={() => signOut()} style={{ cursor: 'pointer' }} />}
        </Toolbar>
      </AppBar>
      <main style={{ paddingTop: 64 }}>{children}</main>
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
