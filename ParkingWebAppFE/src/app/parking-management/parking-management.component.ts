import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService, listImage} from '../service/car.service';
import {Car} from '../car/car';
import {CustomerService} from '../customer/customer.service';
import {Customer} from '../customer/customer';

@Component({
  selector: 'app-parking-management',
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.css']
})
export class ParkingManagementComponent implements OnInit, OnDestroy {
  imageList = listImage;
  index = 0;
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  imageInURL = '/assets/images/cctv1.png';
  imageOutURL = '/assets/images/cctv1.png';
  img64: string;
  body = new FormData();
  formIn: FormGroup;
  formOut: FormGroup;
  car: Car;
  customer: Customer;

  constructor(private formBuilder: FormBuilder, private carService: CarService, private customerService: CustomerService) {
    this.formIn = this.formBuilder.group({
      licenseIn: ['', Validators.required],
      dateIn: ['', Validators.required],
      timeIn: ['', Validators.required],
      customerName: ['', Validators.required],
      email: ['', Validators.required],
      floor: ['', Validators.required],
      parkingLot: ['', Validators.required]
    });
    this.formOut = this.formBuilder.group({
      licenseOut: ['', Validators.required],
      dateOut: ['', Validators.required],
      timeOut: ['', Validators.required],
      type: ['', Validators.required],
      parkingLot: ['', Validators.required],
      ticketStart: ['', Validators.required],
      ticketEnd: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  getLicense(image: string, camera: string): void {
    this.getBase64ImageFromUrl(image).then(result => {
      console.log(result);
      this.body.append('upload', result);
      this.body.append('regions', 'gb');
    }).then(() => {
      this.carService.getLicense(this.body).subscribe(next => {
          const now = new Date();
          console.log(now);
          switch (camera) {
            case 'in':
              this.formIn.patchValue({licenseIn: next.results[0].plate});
              this.formIn.patchValue({dateIn: now});
              this.formIn.patchValue({timeIn: now});
              // this.formIn.patchValue({customerName: data.nameCustomer});
              // this.formIn.patchValue({email: data.email});
              // this.formIn.patchValue({floor: ''});
              // this.formIn.patchValue({parkingLot: ''});
              break;
            case 'out':
              this.formOut.patchValue({licenseOut: next.results[0].plate});
              this.formOut.patchValue({dateOut: now});
              this.formOut.patchValue({timeOut: now});
              // this.formOut.patchValue({type: ''});
              // this.formOut.patchValue({parkingLot: ''});
              // this.formOut.patchValue({ticketStart: ''});
              // this.formOut.patchValue({ticketEnd: ''});
              break;
          }
          this.customerService.findByLicense(next.results[0].plate).subscribe(data => {
            this.customer = data;
          },
            error => {
            console.log('Xe Chua Dang Ky Thong Tin');
            });
        },
        error => console.log(error));
    });
  }

  changeImage(): void {
    this.formIn.reset();
    this.formOut.reset();
    if (this.index < listImage.length) {
      this.index++;
    } else {
      this.index = 0;
    }
    switch (listImage[this.index][0]) {
      case 'in':
        this.imageInURL = listImage[this.index][1];
        break;
      case 'out':
        this.imageOutURL = listImage[this.index][1];
        break;
    }
  }

  async getBase64ImageFromUrl(imageUrl): Promise<any> {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  submitIn(): void {
    this.changeImage();
  }

  submitOut(): void {
    this.changeImage();
  }

  ngOnDestroy(): void {
    this.index = 0;
  }
}
