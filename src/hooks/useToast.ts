import { toastState } from '@/state/toast';
import { useSetRecoilState } from 'recoil';

export const useToast = () => {
  const setToastState = useSetRecoilState(toastState);

  const showToast = (option: { severity: 'error' | 'success'; message: string }) => {
    setToastState(option);
  };

  return {
    showToast,
  };
};
