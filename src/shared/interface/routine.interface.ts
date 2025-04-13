export interface IRoutineForm {
  id: number | string;
  title: string;
  rep: string;
  weight: string;
  restDuration: {id: number; label: string};
}

export interface IRoutines {
  id: number | string;
  workoutName: string;
  day: number;
  routines: IRoutineForm[];
}
