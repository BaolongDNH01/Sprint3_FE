import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { ListTicketComponent } from './components/list-ticket/list-ticket.component';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';



@NgModule({
  declarations: [CreateTicketComponent, ListTicketComponent, EditTicketComponent],
  imports: [
    CommonModule
  ]
})
export class TicketModule { }
