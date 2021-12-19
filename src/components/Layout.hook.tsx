import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { globalState } from '@/state/global';
import { auth } from '@/plugins/firebase';
import { useRecoilValue } from 'recoil';

export const useHooks = () => {
  const { isLoading } = useRecoilValue(globalState);
  const { user } = useAuth();

  const { withLoading } = useLoading();

  const signOut = () => withLoading(async () => await auth.signOut());

  return {
    isLoading,
    user,
    signOut,
  };
};
