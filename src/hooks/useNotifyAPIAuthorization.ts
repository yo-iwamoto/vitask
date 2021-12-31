import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useFirebaseFunctions, useFirestore } from '@/hooks/useFirebase';
import { useToast } from './useToast';
import { ENV } from '@/lib/env';
import { collection, doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

const LINE_AUTHENTICATION_URL = 'https://notify-bot.line.me/oauth/authorize';

const PARAMS = {
  response_type: 'code',
  client_id: 'AD5VheoYvTXjnloQSgGdQY',
  redirect_uri: ENV.LINE_CALLBACK_URL,
  scope: 'notify',
};

const genRandomStr = () => Math.random().toString(32).substring(2);

export const useNotifyAPIAuthorization = () => {
  const { user } = useAuth();
  const firestore = useFirestore();
  const functions = useFirebaseFunctions();

  const { showToast } = useToast();

  const [isNotifyAPIAuthorized, setIsNotifyAPIAuthorized] = useState(true);

  const redirect = () => {
    const url = new URL(LINE_AUTHENTICATION_URL);

    const randomStr = genRandomStr();
    localStorage.setItem('auth_state', randomStr);

    Object.entries({
      ...PARAMS,
      state: randomStr,
    }).map(([key, value]) => url.searchParams.append(key, value));

    location.replace(url.toString());
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      const res = await getDoc(doc(collection(firestore, 'lineAccessTokens'), user.uid));
      if (res.exists()) {
        return;
      }

      setIsNotifyAPIAuthorized(false);
    })();
  }, [user]);

  const revokeToken = async () => {
    await httpsCallable(functions, 'revokeAccessToken')();
    showToast({ severity: 'error', message: '通知設定を解除しました' });
    setIsNotifyAPIAuthorized(false);
  };

  return {
    isNotifyAPIAuthorized,
    redirect,
    revokeToken,
  };
};
