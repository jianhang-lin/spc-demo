export interface Lock {
  monitorName: string;
  location: string;
  partNumber: string;
  status: number;
  chartType: string;
  createTime: string;
  expectedSendTime: string;
  actualSendTime: string;
}

