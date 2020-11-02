import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ParkingManagementComponent} from './parking-management/parking-management.component';
import {AuthLoginComponent} from './login/auth-login/auth-login.component';
import {ListUserComponent} from './user/list-user/list-user.component';


export const routes: Routes = [
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: '', children: [

      {path: '', component: AuthLoginComponent},
      {path: 'home', component: HomepageComponent},

    ]
  }];


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
