import { LocationFamily } from './location-family.model';

export interface LocationFamilyList {
  hasMoreElements: boolean;
  dtoList: Array<LocationFamily>;
}
