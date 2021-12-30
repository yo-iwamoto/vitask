import { atom } from 'recoil';

type LoadingState = {
  isLoading: boolean;
};

export const loadingState = atom<LoadingState>({
  key: 'loadingState',
  default: {
    isLoading: false,
  },
});
