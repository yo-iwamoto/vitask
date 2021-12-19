import { globalState } from '@/state/global';
import { useSetRecoilState } from 'recoil';

export const useLoading = () => {
  const setControlState = useSetRecoilState(globalState);
  const setLoading = (isLoading: boolean) => setControlState((current) => ({ ...current, isLoading }));

  const withLoading = async (cb: () => unknown): Promise<void> => {
    try {
      setLoading(true);
      await cb();
    } finally {
      setLoading(false);
    }
  };

  return { withLoading };
};
