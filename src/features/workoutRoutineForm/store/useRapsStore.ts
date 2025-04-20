import {create} from 'zustand';

export interface IRap {
  id: string;
  duration: number;
  weight: number;
  restDuration: number;
}

interface IRapsStore {
  raps: IRap[];
  setRaps: (newRaps: IRap) => void;
}

const useRapsStore = create<IRapsStore>((set, get) => ({
  raps: [],
  setRaps: (newRaps: IRap) => set({raps: [...get().raps, newRaps]}),
}));

export default useRapsStore;
