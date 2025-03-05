import {ICompleteRunScreen, IRunRecord} from '@shared/interface/run.interface';

export type RootStackParams = {
  drawer: undefined;
  tab: undefined;
  loginScreen: undefined;
  homeScreen: undefined;
  runStack: undefined;
  runScreen: undefined;
  runTrackerScreen: undefined;
  completeRunScreen: ICompleteRunScreen;
  recordStack: undefined;
  recordScreen: undefined;
  recordDetailScreen: IRunRecord;
};
