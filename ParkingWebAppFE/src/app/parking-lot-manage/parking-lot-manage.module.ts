import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingMapComponent } from './parking-map/parking-map.component';
import { ListParkingLotComponent } from './list-parking-lot/list-parking-lot.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [ParkingMapComponent, ListParkingLotComponent],
    exports: [
        ParkingMapComponent,
        ListParkingLotComponent
    ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class ParkingLotManageModule { }
