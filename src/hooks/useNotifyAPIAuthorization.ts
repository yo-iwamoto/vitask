import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ENV } from '@/lib/env';
import { firestore } from '@/plugins/firebase';

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
    firestore
      .collection('lineAccessTokens')
      .doc(user.uid)
      .get()
      .then((res) => {
        if (res.exists) {
          return;
        }

        setIsNotifyAPIAuthorized(false);
      });
  }, [user]);

  return {
    isNotifyAPIAuthorized,
    redirect,
  };
};
