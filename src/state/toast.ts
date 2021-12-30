import { atom } from 'recoil';

type ToastState =
  | {
      severity: 'error' | 'success';
      message: string;
    }
  | undefined;

export const toastState = atom<ToastState>({
  key: 'toastState',
  default: undefined,
});
