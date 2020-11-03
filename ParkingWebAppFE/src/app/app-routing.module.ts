import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ParkingManagementComponent} from './parking-management/parking-management.component';
import {AuthLoginComponent} from './login/auth-login/auth-login.component';
import {ListUserComponent} from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';


export const routes: Routes = [
  {
    path: '', 
    component: AuthLoginComponent,
    children: [
      {
        path: 'home', 
        component: HomepageComponent},
      {
        path: 'parking', 
        component: ParkingManagementComponent
      },
      {
        path: 'ticket',
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
      },
      {
        path: 'add-user', 
        component: AddUserComponent
      },
      {
        path: 'user/:id', 
        component: DetailUserComponent
      },
    ]
  }];

  // Routing của PHƯƠNG -_-
  // {
  //   path: '', children: [
  //     {path: 'login', component: AuthLoginComponent},
  //     {
  //       path: '', component: HomepageComponent, children: [
  //         {path: 'ticket', component: ParkingManagementComponent},
  //         {path: 'add-user', component: AddUserComponent},
  //         {path: 'user/:id', component: DetailUserComponent},
  //       ]
  //     },
  //   ]
  // }];
  

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
