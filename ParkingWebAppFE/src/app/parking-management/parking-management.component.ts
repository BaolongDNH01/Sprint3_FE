import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CarService} from '../service/car.service';
import {Car} from '../car/car';
import {CustomerService} from '../customer/customer.service';

@Component({
  selector: 'app-parking-management',
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.css']
})
export class ParkingManagementComponent implements OnInit {
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  imageURL = '/assets/Singapore_1990_vehicle_registration_plate_of_a_silver_Ford_Focus.jpg';
  img64: string;
  body = new FormData();
  formIn: FormGroup;
  car: Car;
  constructor( private carService: CarService, private customerService: CustomerService) {
    // this.formIn = this.formBuilder.group({
    //   license: ['', Validators.required],
    //   dateIn: ['', Validators.required],
    //   timeIn: ['', Validators.required],
    // });
  }

  ngOnInit(): void {

  }

  getLicense(): void {
    this.getBase64ImageFromUrl(this.imageURL).then(result => {
      console.log(result);
      this.body.append('upload', result);
      this.body.append('regions', 'gb');
    }).then(() => {
      this.carService.getLicense(this.body).subscribe(next => {
          console.log(next.results[0].plate);
          console.log(next.results[0].vehicle.type);
        },
        error => console.log(error));
    });
  }

   async getBase64ImageFromUrl(imageUrl): Promise<any>{
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader  = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
