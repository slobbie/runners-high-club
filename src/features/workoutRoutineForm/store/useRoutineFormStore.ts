import {create} from 'zustand';

import {IRoutineForm} from '@shared/interface/routine.interface';

interface IBackBgStore {
  routineFormData: IRoutineForm[];
  routineFormEdit: IRoutineForm | null;
  setRoutineFormData: (pRoutineFormData: IRoutineForm) => void;
  resetRoutineFormData: () => void;
  updateRoutineFormData: (pRoutineFormData: IRoutineForm) => void;
  setRoutineFormEdit: (pRoutineFormEdit: IRoutineForm) => void;
}

const useRoutineFormStore = create<IBackBgStore>((set, get) => ({
  routineFormData: [],
  routineFormEdit: null,
  setRoutineFormData: (pRoutineFormData: IRoutineForm) => {
    const {routineFormData} = get();
    set({routineFormData: [...routineFormData, pRoutineFormData]});
  },
  setRoutineFormEdit: (pRoutineFormEdit: IRoutineForm) => {
    set({routineFormEdit: pRoutineFormEdit});
  },
  resetRoutineFormData: () => {
    set({routineFormData: []});
  },
  updateRoutineFormData: (pRoutineFormData: IRoutineForm) => {
    const {routineFormData} = get();

    const existingRoutineIndex = routineFormData.findIndex(
      item => item.id === pRoutineFormData.id,
    );

    // 루틴이 존재하지 않으면 업데이트 실패
    if (existingRoutineIndex === -1) {
      set({routineFormData: routineFormData});
      return;
    }

    // 기존 데이터와 새 데이터 병합
    const updatedRoutine = {
      ...routineFormData[existingRoutineIndex],
      ...pRoutineFormData,
    };

    // 업데이트된 배열 생성
    const newRoutineFormData = [...routineFormData];
    newRoutineFormData[existingRoutineIndex] = updatedRoutine;

    // 상태 업데이트
    set({routineFormData: newRoutineFormData});
  },
}));

export default useRoutineFormStore;
