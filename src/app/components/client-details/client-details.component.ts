import { Component, OnInit } from '@angular/core';
import { GetClientDetailsResponse } from 'src/app/models/clients-details-response.model';
import { ClientDetailsService } from 'src/app/services/client-details.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  clientDetails?: GetClientDetailsResponse;
  document: any;

  constructor(private clientDetailsService: ClientDetailsService) { }

  ngOnInit(): void {
    this.getClientDetails(this.document);
  }

  getClientDetails(document: any): void {
    this.clientDetailsService.getClientDetails(document).subscribe(
      (clientDetails: GetClientDetailsResponse) => {
        this.clientDetails = clientDetails;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}