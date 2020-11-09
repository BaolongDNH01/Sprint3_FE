import {Component, OnInit} from '@angular/core';
import {ParkingLotService} from '../service/parking-lot.service';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';
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
  isDone = false;
  listZoneApi: Zone[] = [];
  listZoneShow: Zone[] = [];
  idFloorChoose: number;

  constructor(private parkingLotService: ParkingLotService) {
  }

  ngOnInit(): void {
    this.prepare();
  }

  prepare(): void {
    this.isDone = false;
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

    this.getZone();
  }

  getZone(): void {
    this.parkingLotService.getAllZone().subscribe(
      list => {
        this.listZoneApi = list;
      },
      () => null,
      () => {
        if (this.isDone) {
          this.getZoneByFloor(this.idFloorChoose);
        }
      }
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
    this.listZoneAdd = [];
    for (let i = 0; i < count; i++) {
      const zone = new Zone();
      zone.id = i;
      zone.direction = 0;
      this.listZoneAdd.push(new Zone());
    }
    this.isDone = true;
  }

  save(): void {
    this.parkingLotService.addFloor(this.listZoneAdd).subscribe(
      () => null,
      () => null,
      () => this.prepare()
    );
  }

  getZoneByFloor(id: number): void {
    this.idFloorChoose = id;
    this.listZoneShow = this.listZoneApi.filter(zone => {
      if (zone.idFloor == id) {
        return zone;
      }
    });
    this.isDone = true;
  }

  deleteZone(id: number): void {
    this.parkingLotService.deleteZone(id).subscribe(
      () => {
        this.getZone();
      },
    );
  }

  addZone(): void {
    this.parkingLotService.addZone(this.idFloorChoose).subscribe(
      () => {
        this.getZone();
      },
    );
  }

  deleteFloor(id: number): void {
    this.parkingLotService.deleteFloor(id).subscribe(
      () => {
        this.prepare();
        setTimeout(() => {
          document.getElementById('cancel').click();
          document.getElementById('mag').click();
        }, 1000);
      }
    );
  }
}
