import {create} from 'zustand';

interface INavigationStore {
  isTabShowStatus: boolean;
  setIsTabShowStatus: (isTabShowStatus: boolean) => void;
}

const useNavigationStore = create<INavigationStore>(set => ({
  isTabShowStatus: true,
  setIsTabShowStatus: (isTabShowStatus: boolean) => {
    set({isTabShowStatus});
  },
}));

export default useNavigationStore;
