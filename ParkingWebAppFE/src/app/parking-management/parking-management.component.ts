import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService, listImage} from '../service/car.service';
import {Car} from '../car/car';
import {CustomerService} from '../customer/customer.service';
import {Customer} from '../customer/customer';
import {Parking} from '../service/parking';
import {ParkingRe} from './model/parkingRe';
import {TicketService} from '../ticket/services/ticket.service';
import {ParkingReService} from './service/parking-re.service';
import {ParkingLot} from '../parking-lot-manage/entity/parking-lot';

declare var $: any;

@Component({
  selector: 'app-parking-management',
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.css']
})
export class ParkingManagementComponent implements OnInit, OnDestroy {
  imageList = listImage;
  index = 0;
  imageInURL = '/assets/images/cctv1.png';
  imageOutURL = '/assets/images/cctv1.png';
  body = new FormData();
  formIn: FormGroup;
  formOut: FormGroup;
  car: Car;
  customer: Customer;
  modalBody: string;
  parking: ParkingRe;
  URL: string;
  private idParking: number;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private parkingReService: ParkingReService,
              private customerService: CustomerService,
              private ticketService: TicketService) {
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
      this.body.append('upload', result);
      this.body.append('regions', 'gb');
    }).then(() => {
      this.carService.getLicense(this.body).subscribe(next => {
          const now = new Date();
          console.log(now);
          switch (camera) {
            case 'in':
              localStorage.setItem('license', next.results[0].plate);
              this.formIn.patchValue({licenseIn: next.results[0].plate});
              this.formIn.patchValue({dateIn: now});
              this.formIn.patchValue({timeIn: now});
              console.log(this.formIn.get('dateIn').value);
              this.parkingReService.checkIn(next.results[0].plate).subscribe(data => {
                this.formIn.patchValue({customerName: data.customerName});
                this.formIn.patchValue({email: data.customerEmail});
                const ticketId = data.ticketId;
                if (ticketId == null) {
                  this.URL = '/list-user';
                  this.modalBody = 'Vé hết hiệu lực hoặc chưa mua vé.\n Mua vé mới?';
                  $('#dialogModal').modal('show');
                } else {
                  this.formIn.patchValue({floor: data.parkingLotDTO.nameFloor});
                  this.formIn.patchValue({parkingLot: data.parkingLotDTO.nameZone + '-' + data.parkingLotDTO.id});
                }
              }, error => {
                this.URL = '/ticket/list';
                this.modalBody = 'Xe chưa đăng ký \n Đăng ký thông tin xe?';
                $('#dialogModal').modal('show');
              });
              break;
            case 'out':
              this.formOut.patchValue({licenseOut: next.results[0].plate});
              this.formOut.patchValue({dateOut: now});
              this.formOut.patchValue({timeOut: now});
              this.parkingReService.checkOut(next.results[0].plate).subscribe(value => {
                this.formOut.patchValue({type: value.carType});
                this.formOut.patchValue({parkingLot: value.parkingLotDTO.nameZone + '-' + value.parkingLotDTO.id});
                this.formOut.patchValue({ticketStart: value.dateStart});
                this.formOut.patchValue({ticketEnd: value.dateEnd});
                this.idParking = value.idParking;
              });
              break;
          }
        },
        error => console.log(error));
    });
  }

  changeImage(): void {
    this.formIn.reset();
    this.formOut.reset();
    if (this.index < this.imageList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
    switch (this.imageList[this.index][0]) {
      case 'in':
        this.imageInURL = this.imageList[this.index][1];
        break;
      case 'out':
        this.imageOutURL = this.imageList[this.index][1];
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
    if (this.formIn.valid) {
      this.parking = {
        idParking: null,
        dateStart: this.formIn.get('dateIn').value,
        dateEnd: null,
        carType: null,
        status: true,
        customerName: null,
        customerEmail: null,
        license: this.formIn.get('licenseIn').value,
        ticketId: null,
        parkingLotDTO: null,
      };
      this.parkingReService.confirmIn(this.parking).subscribe(value => {
      }, error => {
        console.log(error);
      });
    }
    this.changeImage();
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }

  submitOut(): void {
    console.log(this.idParking);
    if (this.formOut.valid) {
      this.parking = {
        idParking: this.idParking,
        dateStart: null,
        dateEnd: this.formOut.get('dateOut').value,
        carType: null,
        status: false,
        customerName: null,
        customerEmail: null,
        license: this.formOut.get('licenseOut').value,
        ticketId: null,
        parkingLotDTO: null,
      };
      console.log(this.parking);
      this.parkingReService.confirmOut(this.parking).subscribe(value => {
      }, error => {
        console.log(error);
      });
    }
    this.changeImage();
  }

  ngOnDestroy(): void {
    this.index = 0;
  }
}
