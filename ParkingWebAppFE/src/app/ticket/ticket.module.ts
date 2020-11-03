import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './components/list-ticket/create-ticket/create-ticket.component';
import { ListTicketComponent } from './components/list-ticket/list-ticket.component';
import { EditTicketComponent } from './components/list-ticket/edit-ticket/edit-ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { DeleteTicketComponent } from './components/list-ticket/delete-ticket/delete-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CreateTicketComponent,
    ListTicketComponent,
    EditTicketComponent,
    DeleteTicketComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TicketRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
})
export class TicketModule { }
