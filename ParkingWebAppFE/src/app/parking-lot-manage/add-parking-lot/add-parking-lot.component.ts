import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParkingLot} from '../entity/parking-lot';
import {ParkingLotService} from '../service/parking-lot.service';
import {Floor} from '../entity/floor';
import {Zone} from '../entity/zone';

@Component({
  selector: 'app-add-parking-lot',
  templateUrl: './add-parking-lot.component.html',
  styleUrls: ['./add-parking-lot.component.css']
})
export class AddParkingLotComponent implements OnInit {
  addParkingLotForm: FormGroup;
  parkingLot: ParkingLot;
  listFloor: Floor[];
  listZoneApi: Zone[];
  listZoneShow: Zone[];
  message: string;
  count = 0;
  timeOut: any;

  constructor(private formBuilder: FormBuilder,
              private parkingLotService: ParkingLotService) {
  }

  ngOnInit(): void {
    this.parkingLotService.getAllFloor().subscribe(
      list => this.listFloor = list
    );

    this.parkingLotService.getAllZoneByFloor(0).subscribe(
      list => {
        this.listZoneApi = list;
        this.switchFloor(1);
      }
    );
  }

  buildForm(): void{
    this.addParkingLotForm = this.formBuilder.group({
      idFloor: [1, Validators.required],
      idZone: [this.listZoneShow[0].id, Validators.required]
    });
  }

  addParkingLot(): void {
    this.parkingLot = this.addParkingLotForm.value;
    this.parkingLotService.addParkingLot(this.parkingLot).subscribe(
      () => null,
      () => null,
      () => this.showMessage()
    );
  }

  switchFloor(floor: number): void {
    this.listZoneShow = this.listZoneApi.filter(zone => {
      if (zone.idFloor == floor) {
        return zone;
      }
    });
    this.buildForm();
  }

  showMessage(): void{
    this.count ++;
    this.message = 'Đã thêm mới ' + this.count + ' vị trí thành công!';
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
