import { useAuth } from '@/hooks/useAuth';
import { loadingState } from '@/state/loading';
import { useRecoilValue } from 'recoil';

export const useHooks = () => {
  const { isLoading } = useRecoilValue(loadingState);
  const { user } = useAuth();

  return {
    isLoading,
    user,
  };
};
