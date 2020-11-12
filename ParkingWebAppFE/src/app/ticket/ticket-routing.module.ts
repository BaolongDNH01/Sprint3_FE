import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListTicketComponent } from './components/list-ticket/list-ticket.component';
import { CreateTicketComponent } from './components/list-ticket/create-ticket/create-ticket.component';
import { EditTicketComponent } from './components/list-ticket/edit-ticket/edit-ticket.component';
import { DeleteTicketComponent } from './components/list-ticket/delete-ticket/delete-ticket.component';

export const ticketRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ListTicketComponent
  },
  {
    path: 'create',
    component: CreateTicketComponent
  },
  {
    path: 'edit/:idTicket',
    component: EditTicketComponent
  },
  {
    path: 'get-deleted',
    component: DeleteTicketComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ticketRoutes),
  ],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
