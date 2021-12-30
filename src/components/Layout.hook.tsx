import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { loadingState } from '@/state/loading';
import { auth } from '@/lib/firebase';
import { useRecoilValue } from 'recoil';

export const useHooks = () => {
  const { isLoading } = useRecoilValue(loadingState);
  const { user } = useAuth();

  const { withLoading } = useLoading();

  const signOut = () => withLoading(async () => await auth.signOut());

  return {
    isLoading,
    user,
    signOut,
  };
};
