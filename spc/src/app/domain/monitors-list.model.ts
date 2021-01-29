import { Monitor } from './monitor.model';

export interface MonitorsList {
  hasMoreElements: boolean;
  dtoList: Array<Monitor>;
}

