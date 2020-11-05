import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';
import {Zone} from '../entity/zone';
import {ParkingLotService} from '../service/parking-lot.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.css']
})
export class EditParkingLotComponent implements OnInit {
  editParkingLotForm: FormGroup;
  parkingLot: ParkingLot;
  listFloor: Floor[];
  listZoneApi: Zone[];
  listZoneShow: Zone[];
  id: number;

  constructor(private formBuilder: FormBuilder,
              private parkingLotService: ParkingLotService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(params.get('id'));
      this.parkingLotService.getParkingLotById(this.id).subscribe(
        par => {
          this.parkingLot = par;
          this.form();
        }
      );
    });
  }

  form(): void {
    this.parkingLotService.getAllFloor().subscribe(
      list => this.listFloor = list,
    );

    this.parkingLotService.getAllZoneByFloor(0).subscribe(
      list => {
        this.listZoneApi = list;
        this.switchFloor(1);
      }
    );

    this.editParkingLotForm = this.formBuilder.group({
      id: [this.parkingLot.id],
      idFloor: [this.parkingLot.idFloor, Validators.required],
      idZone: [this.parkingLot.idZone, Validators.required],
      status: [this.parkingLot.status, Validators.required],
    });
  }

  editParkingLot(): void {
    this.parkingLot = this.editParkingLotForm.value;
    this.parkingLotService.editParkingLot(this.parkingLot).subscribe();
  }

  switchFloor(floor: number): void {
    this.listZoneShow = this.listZoneApi.filter(zone => {
      //  cần để ==
      if (zone.idFloor == floor) {
        return zone;
      }
    });
  }
}
