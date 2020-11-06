import {Component, OnInit} from '@angular/core';
import {ParkingLotService} from '../service/parking-lot.service';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';
import {FormGroup} from '@angular/forms';
import {Zone} from '../entity/zone';

@Component({
  selector: 'app-list-parking-lot',
  templateUrl: './list-parking-lot.component.html',
  styleUrls: ['./list-parking-lot.component.css']
})
export class ListParkingLotComponent implements OnInit {
  listParkingLotApi: ParkingLot[] = [];
  listParkingLotShow: ParkingLot[] = [];
  currentPage: number;
  totalItem: number;
  floorList: Floor[];
  deleteItem = new ParkingLot;
  listZoneAdd: Zone[] = [];
  countZoneAdd = 1;
  isDone = false;
  floorAdding: Floor;

  constructor(private parkingLotService: ParkingLotService) {
  }

  ngOnInit(): void {
    this.prepare();
  }

  prepare(): void {
    this.parkingLotService.getAllParkingLot().subscribe(
      list => {
        this.listParkingLotApi = list;
        this.totalItem = list.length;
        this.listParkingLotShow = list;
      },
      e => console.log(e)
    );

    this.parkingLotService.getAllFloor().subscribe(
      list => this.floorList = list
    );
  }

  filterByFloor(floor: string): void {
    if (floor === 'none') {
      this.listParkingLotShow = this.listParkingLotApi;
      return;
    }

    this.listParkingLotShow = this.listParkingLotApi.filter(par => {
      if (par.nameFloor === floor) {
        return par;
      }
    });
  }

  checkDelete(par: ParkingLot): void {
    this.deleteItem = par;
  }


  delete(): void {
    this.parkingLotService.deleteParkingLot(this.deleteItem.id).subscribe(
      () => this.prepare()
    );
  }

  prepareListZone(count: number): void {
    for (let i = 0; i < count; i++) {
      const zone = new Zone();
      zone.id = i;
      zone.direction = 0;
      this.listZoneAdd.push(new Zone());
    }
    this.isDone = true;
  }

  save(): void {
    this.parkingLotService.addFloor().subscribe(
      floor => {
        this.floorAdding = floor;
        this.saveZone();
      }
    );
  }

  saveZone(): void {
    this.listZoneAdd.forEach(zone => {
      this.parkingLotService.addZone(this.floorAdding, zone).subscribe();
    });
  }
}
