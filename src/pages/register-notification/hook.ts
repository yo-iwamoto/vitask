import { useAuth } from '@/hooks/useAuth';
import { useNotifyAPIAuthorization } from '@/hooks/useNotifyAPIAuthorization';

export const usePage = () => {
  useAuth(true);

  const { redirect } = useNotifyAPIAuthorization();

  return {
    redirect,
  };
};
