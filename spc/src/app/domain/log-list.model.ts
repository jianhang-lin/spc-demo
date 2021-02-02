import { Log } from './log.model';

export interface LogList {
  hasMoreElements: boolean;
  dtoList: Array<Log>;
}
