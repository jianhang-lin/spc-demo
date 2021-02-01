export interface EmailReceiveRule {
  receiveRuleKey: number;
  name: string;
  description: string;
  shopFloorId: string;
  part: string;
  process: string;
  workstation: string;
  partFamilyId: string;
  monitorGroupKey: number;
  emailGroupKey: number;
  locationFamily: string;
  status: number;
  id: number;
}

