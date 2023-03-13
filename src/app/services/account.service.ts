import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  basePath: string = "http://localhost:8080/api/v1/account";

  constructor(private httpClient: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.basePath}`, account);
  }
  
}
