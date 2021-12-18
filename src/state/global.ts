import { atom } from 'recoil';

type GlobalState = {
  isLoading: boolean;
};

export const globalState = atom<GlobalState>({
  key: 'globalState',
  default: { isLoading: false },
});
