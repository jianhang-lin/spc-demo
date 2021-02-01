import { EmailReceiveRule } from './email-receive-rule.model';

export interface EmailReceiveRuleList {
  hasMoreElements: boolean;
  dtoList: Array<EmailReceiveRule>;
}
