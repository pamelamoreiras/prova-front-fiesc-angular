import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  clientForm!: FormGroup;
  clients: Client[] = [];
  isEditing = false;
  editMode = false;
  editingClientId: string | null = null;
  editingClient?: Client;

  @ViewChild('nameField') nameField: ElementRef | undefined;


  client: Client  = {
    id: '',
    name: '',
    document: '',
    address: ''
  }

  name: FormControl = new FormControl(null, Validators.required);
  document: FormControl = new FormControl(null, Validators.required);
  address: FormControl = new FormControl(null, Validators.required);

  constructor(private  clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients()
      .subscribe(
        response => {
          console.log(response);
          this.clients = response;
        },
        error => {
          console.log(error);
          // TODO: show error message to user
        }
      );
  }

  editClient(id: number): void {
    const foundClient = this.clients.find(client => client.id === id);
    if (foundClient) {
      this.client = foundClient;
    }
  }

  createClient(): void {
    const clientObservable = this.client.id ?
      this.clientService.updateClient(this.client.id, this.client) :
      this.clientService.createClient(this.client);
  
    clientObservable.subscribe(
      response => {
        this.loadClients();
        console.log(response);
        this.name.reset();
        this.document.reset();
        this.address.reset();
        // TODO: show success message to user
      },
      error => {
        console.log(error);
        // TODO: show error message to user
      }
    );
  }

  deleteClient(id: any): void {
    console.log(this.client.id);
    
    if (confirm('Tem certeza que seja deletar esse cliente? ')) {
      this.clientService.deleteClient(id)
      .subscribe(
        response => {
          console.log(response);
          this.loadClients();
          // TODO: show success message to user
        },
        error => {
          console.log(error);
          // TODO: show error message to user
        }
      );
    }
  }


  updateClient(id: string): void {
    const client = this.clients.find(c => c.id === id);
    if (client) {
      client.name = this.name.value;
      client.document = this.document.value;
      client.address = this.address.value;
  
      this.clientService.updateClient(id, client).subscribe(
        response => {
          console.log(response);
          this.loadClients();
          this.editMode = false;
          this.editingClientId = null;
          // TODO: show success message to user
        },
        error => {
          console.log(error);
          // TODO: show error message to user
        }
      );
    }
  }

  selectClient(client: Client): void {
    this.clientForm.setValue({
      name: client.name,
      document: client.document,
      address: client.address
    });
    this.isEditing = true;
    this.editingClientId = client.id;
  }

  
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
  
    if (target.id === 'name' && target.type === 'text') {
      const keyCode = event.which || event.keyCode;
      const keyValue = String.fromCharCode(keyCode);
      const regex = /^[a-zA-Z\s]*$/;
  
      if (!regex.test(keyValue)) {
        event.preventDefault();
      }
    }
  }


}
