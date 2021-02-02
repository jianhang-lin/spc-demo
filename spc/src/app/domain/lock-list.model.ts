import { Lock } from './lock.model';

export interface LockList {
  hasMoreElements: boolean;
  dtoList: Array<Lock>;
}
