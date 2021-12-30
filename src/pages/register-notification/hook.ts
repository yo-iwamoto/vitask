import { useNotifyAPIAuthorization } from '@/hooks/useNotifyAPIAuthorization';

export const usePage = () => {
  const { redirect } = useNotifyAPIAuthorization();

  return {
    redirect,
  };
};
