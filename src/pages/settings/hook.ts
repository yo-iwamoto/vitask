import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useNotifyAPIAuthorization } from '@/hooks/useNotifyAPIAuthorization';

export const usePage = () => {
  const router = useRouter();
  useAuth(true);
  const { withLoading } = useLoading();

  const { redirect, isNotifyAPIAuthorized, revokeToken } = useNotifyAPIAuthorization();

  const pushToRegistrationPage = () => router.push('/register-notification');

  const onClickRevokeButton = () => {
    if (confirm('本当に通知設定を解除しますか？ (いつでも再設定可能です)')) {
      withLoading(revokeToken);
    }
  };

  return {
    redirect,
    isNotifyAPIAuthorized,
    pushToRegistrationPage,
    onClickRevokeButton,
  };
};
