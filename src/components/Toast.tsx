import { toastState } from '@/state/toast';
import { Alert, Snackbar } from '@mui/material';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const Toast: React.VFC = () => {
  const toastStateValue = useRecoilValue(toastState);
  const resetToastState = useResetRecoilState(toastState);

  return (
    <>
      {toastStateValue && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={(_event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            resetToastState();
          }}
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={toastStateValue.severity}
            onClose={resetToastState}
            sx={{ width: '100%' }}
          >
            {toastStateValue.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
