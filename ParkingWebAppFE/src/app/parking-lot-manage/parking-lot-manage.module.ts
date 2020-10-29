import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingMapComponent } from './parking-map/parking-map.component';



@NgModule({
  declarations: [ParkingMapComponent],
  exports: [
    ParkingMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ParkingLotManageModule { }
