import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetClientDetailsResponse } from '../models/clients-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  private clientDetailsUrl = 'http://localhost:8080/api/v1/client/detail';

  constructor(private http: HttpClient) { }

  getClientDetails(document: any): Observable<GetClientDetailsResponse> {
    return this.http.get<GetClientDetailsResponse>(`${this.clientDetailsUrl}/{document}`);
  }

}
