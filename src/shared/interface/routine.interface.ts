export interface IRoutineForm {
  id: number | string;
  title: string;
  rep: string;
  weight: string;
  rest: string;
}

export interface IRoutines {
  id: number | string;
  workoutName: string;
  day: string;
  routines: IRoutineForm[];
}
