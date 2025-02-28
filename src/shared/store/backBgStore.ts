import {create} from 'zustand';

interface IBackBgStore {
  safeAreaViewBg: string;
  setSafeAreaViewBg: (safeAreaViewBg: string) => void;
}

const useBackBgStore = create<IBackBgStore>(set => ({
  safeAreaViewBg: '#fff',
  setSafeAreaViewBg: (safeAreaViewBg: string) => {
    set({safeAreaViewBg});
  },
}));

export default useBackBgStore;
