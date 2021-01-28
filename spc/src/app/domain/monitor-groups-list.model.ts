import { MonitorGroup } from './monitor-group.model';

export interface MonitorGroupsList {
  hasMoreElements: boolean;
  dtoList: Array<MonitorGroup>;
}

