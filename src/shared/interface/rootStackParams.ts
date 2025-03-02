import {IRunRecord} from '@api/run/interface/run.interface';

export type RootStackParams = {
  login: undefined;
  tab: undefined;
  run: {
    run: undefined;
  };
  recordStack: {
    record: undefined;
  };
  recordDetail: IRunRecord;
};
