import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingMapComponent } from './parking-map/parking-map.component';
import { ListParkingLotComponent } from './list-parking-lot/list-parking-lot.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddParkingLotComponent } from './add-parking-lot/add-parking-lot.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditParkingLotComponent } from './edit-parking-lot/edit-parking-lot.component';



@NgModule({
  declarations: [ParkingMapComponent, ListParkingLotComponent, AddParkingLotComponent, EditParkingLotComponent],
  exports: [
    ParkingMapComponent,
    ListParkingLotComponent,
    AddParkingLotComponent,
    EditParkingLotComponent
  ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class ParkingLotManageModule { }
