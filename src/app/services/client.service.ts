import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { GetClientDetailsResponse } from '../models/clients-details-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  basePath: string = "http://localhost:8080/api/v1/client"


  constructor(private http: HttpClient) { }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.basePath}`, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.basePath);
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.basePath}/${clientId}`);
  }

  getClientDetails(document: any): Observable<GetClientDetailsResponse> {
    const url = `${this.basePath}/clients/${document}`;
    return this.http.get<GetClientDetailsResponse>(url);
  }

  updateClient(id: any, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.basePath}/${id}`, client);
  }

  deleteClient(id: any): Observable<void> {
    console.log(`${this.basePath}/${id}`)
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }
 
}
