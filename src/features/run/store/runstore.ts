import {create} from 'zustand';

interface IRunStore {
  distanceRun: string;
  distanceRunningTime: string;
  distanceRunningPace: string;
  setDistanceRun: (distanceRun: string) => void;
  setDistanceRunningTime: (distanceRunningTime: string) => void;
  setDistanceRunningPace: (distanceRunningPace: string) => void;
}

const useRunStore = create<IRunStore>(set => ({
  distanceRun: '0.00',
  distanceRunningTime: '0:00',
  distanceRunningPace: '0:00',
  setDistanceRun: (distanceRun: string) => {
    set({distanceRun});
  },
  setDistanceRunningTime: (distanceRunningTime: string) => {
    set({distanceRunningTime});
  },
  setDistanceRunningPace: (distanceRunningPace: string) => {
    set({distanceRunningPace});
  },
}));

export default useRunStore;
