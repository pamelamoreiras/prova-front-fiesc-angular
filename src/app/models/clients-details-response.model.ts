import { Account } from './account.model';


export class GetClientDetailsResponse {
  name?: string;
  document?: string;
  address?: string;
  accounts?: Account[];
}