import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFirebaseFunctions } from '@/hooks/useFirebase';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';
import { httpsCallable } from 'firebase/functions';

export const usePage = () => {
  const router = useRouter();
  const { withLoading } = useLoading();
  const functions = useFirebaseFunctions();

  const { showToast } = useToast();

  const claimAccessToken = (payload: { code: string }) =>
    withLoading(async () => {
      await httpsCallable(functions, 'claimAccessToken')(payload);
      showToast({ severity: 'success', message: 'LINE Notifyへの通知登録が完了しました' });
      await router.push('/dashboard');
    });

  useEffect(() => {
    const { code, state } = router.query;
    if (typeof code !== 'string' || typeof state !== 'string') {
      return;
    }

    const localStorageState = localStorage.getItem('auth_state');
    if (localStorageState !== state) {
      throw new Error('unauthorized');
    }

    claimAccessToken({ code });
  }, [router.query]);
};
