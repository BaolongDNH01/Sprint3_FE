import { Component, OnInit } from '@angular/core';

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
  formIn = new Form
  constructor() { }

  ngOnInit(): void {
    this.getBase64ImageFromUrl(this.imageURL).then(result => {
      console.log(result);
      this.body.append('upload', result);
      this.body.append('regions', 'vn');
    });
  }
  getLicense(): void {
    fetch(this.proxyUrl + 'https://api.platerecognizer.com/v1/plate-reader/', {
      method: 'POST',
      headers: {
        Authorization: 'Token b254bd5bb420657fdf9b07b597db61a8dbaee6e8'
      },
      body: this.body
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch((err) => {
        console.log(err);
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
