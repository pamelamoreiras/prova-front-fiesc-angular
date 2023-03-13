import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { Client } from 'src/app/models/client.model';
import { GetClientDetailsResponse } from 'src/app/models/clients-details-response.model';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  clients: Client[] = [];
  selectedClient?: Client;
  accountNumber?: number;
  errorMessage?: string;
  successMessage?: string;

  responseDetails?: GetClientDetailsResponse[]  = [];

  account: Account = {
    id: '',
    accountNumber: 0,
    balance: 0,
    document: ''
  };

  constructor(
    private clientService: ClientService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients,
      error => console.log(error)
    );
  }

  createAccount(document: any, accountNumber?: number): void {

      if (this.selectedClient && this.accountNumber) {
    
        this.account.document = document;
        this.account.accountNumber = accountNumber;
        
        this.accountService.createAccount(this.account).subscribe(
          response => {
            this.successMessage = 'Conta criada com sucesso!';
            this.errorMessage = undefined;
          }, 
          error => {
            this.errorMessage = 'Erro ao criar a conta.';
            this.successMessage = undefined;
          }
        );
      }
    }

  
    getDetails(): void {
      console.log(this.account.document);
      this.clientService.getClientDetails(this.account.document).subscribe(
        response => {
          console.log(response)
        },
        error => console.error(error)
      )
    }
  }

