import {create} from 'zustand';

import {IRoutines} from '@shared/interface/routine.interface';

interface IBackBgStore {
  routineData: IRoutines[];
  updateRoutineData: (pRoutineData: IRoutines) => void;
}

const useRoutineStore = create<IBackBgStore>((set, get) => ({
  routineData: [],
  updateRoutineData: (pRoutineData: IRoutines) => {
    const {routineData} = get();
    set({routineData: [...routineData, pRoutineData]});
  },
}));

export default useRoutineStore;
