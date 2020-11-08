import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {CarService} from '../../car/car.service';
import {Car} from '../../car/car';
import {TicketService} from '../../ticket/services/ticket.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  curPage = 1;
  customerList = [];
  carList: Car[];
  showCar = true;
  customerDetail =  new Customer();
  arrCar = [];
  customerClass = new Customer();
  id = 0;
  idCar = 0;
  formCustomer: FormGroup;
  formCar: FormGroup;
  carClass = new Car();
  showAddCar = false;
  key = '';
  constructor(private customerService: CustomerService, private carService: CarService, private ticketService: TicketService,
              private fb: FormBuilder, private router: Router) {
    this.formCustomer = this.fb.group({
      id: [''],
      nameCustomer: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      gender: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      address: ['', [Validators.required]],
      cars: ['']
    });
    this.formCar = this.fb.group({
      carId: [],
      license: ['', Validators.required],
      color: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      type: ['', Validators.required],
      ticket: [''],
      parkings: [''],
      customerId: ['']
    });
  }

  ngOnInit(): void {
    this.customerService.findAll().subscribe(
      next => {
        this.customerList = next;
      }, error => {
        this.customerList = new Array();
      }, () => {
      }
    );
  }
  findCarByCustomer(id: number): void{
    this.showAddCar = false;
    this.idCar = 0;
    this.arrCar = [];
    this.customerService.findById(id).subscribe(
      next => {
        this.customerDetail = next;
      }, error => {
        this.customerDetail = new Customer();
      }, () => {
        this.carService.findCarByCustomer(id).subscribe(
          next => {
            this.carList = next;
          }, error => {
            console.log('error');
            this.carList = new Array();
          }, () => {
            this.showCar = this.carList.length !== 0;
          }
        );
      }
    );
  }



  editFormCustomer(id: number): void{
    this.id = id;
    this.customerService.findById(id).subscribe(
      next => {
        this.customerClass = next;
      }, error => {
        this.customerClass = new Customer();
      }, () => {
        this.formCustomer.patchValue({id: this.customerClass.id});
        this.formCustomer.patchValue({nameCustomer: this.customerClass.nameCustomer});
        this.formCustomer.patchValue({birthday: this.customerClass.birthday});
        this.formCustomer.patchValue({email: this.customerClass.email});
        this.formCustomer.patchValue({phone: this.customerClass.phone});
        this.formCustomer.patchValue({gender: this.customerClass.gender});
        this.formCustomer.patchValue({idCard: this.customerClass.idCard});
        this.formCustomer.patchValue({address: this.customerClass.address});
        this.formCustomer.patchValue({cars: this.customerClass.cars});
      }
    );
  }

  editCustomer(): void{
    this.customerClass = Object.assign({}, this.formCustomer.value);
    this.customerService.editCustomer(this.customerClass).subscribe(
      next => {},
      error => {
        alert('Hãy nhập email, số điện thoại, chứng minh nhân dân chính xác!');
      },
      () => {
        this.customerService.findAll().subscribe(
          next => {
            this.customerList = next;
          }, error => {
            this.customerList = new Array();
          }, () => {
          }
        );
        this.id = 0;
      }
    );
  }
  formEditCar(id: number): void{
    this.carService.findById(id).subscribe(
      next => {
        this.carClass = next;
      }, error => {},
      () => {
        this.formCar.patchValue({carId: this.carClass.carId});
        this.formCar.patchValue({license: this.carClass.license});
        this.formCar.patchValue({color: this.carClass.color});
        this.formCar.patchValue({producer: this.carClass.producer});
        this.formCar.patchValue({type: this.carClass.type});
        this.formCar.patchValue({ticket: this.carClass.ticket});
        this.formCar.patchValue({customerId: this.carClass.customerId});
        this.formCar.patchValue({parkings: this.carClass.parkings});
        this.showAddCar = false;
      }
    );
    this.idCar = id;
  }
  editCar(id: number): void{
    this.carClass = Object.assign({}, this.formCar.value);
    console.log(this.carClass);
    this.carService.editCar(this.carClass).subscribe(
      next => {
      }, error => {},
      () => {
        this.idCar = 0;
        this.carService.findCarByCustomer(id).subscribe(
          next => {
            this.carList = next;
            console.log(this.id);
          }, error => {
          }
        );
      }
    );
  }

  delete(idCar: number, idCustomer): void{
    console.log(idCar);
    this.carService.deleteCar(idCar).subscribe(
      next => {},
      error => {},
      () => {
        alert('Xóa thành công!');
        this.carService.findCarByCustomer(idCustomer).subscribe(
          next => {
            this.carList = next;
            console.log(this.id);
          }, error => {
          }
        );
      }
    );
  }

  formAddCar(id: number): void{
    this.formCar.patchValue({carId: 0});
    this.formCar.patchValue({license: ''});
    this.formCar.patchValue({color: ''});
    this.formCar.patchValue({producer: ''});
    this.formCar.patchValue({type: ''});
    this.formCar.patchValue({ticket: []});
    this.formCar.patchValue({customerId: id});
    this.formCar.patchValue({parkings: []});
    this.showAddCar = true;
    this.idCar = 0;
  }
  close(): void{
    this.showAddCar = false;
  }

  addCar(id: number): void{
    this.carClass = Object.assign({}, this.formCar.value);
    console.log(this.carClass);
    this.carService.addCar(this.carClass).subscribe(
      next => {},
      error => {},
      () => {
        this.carService.findCarByCustomer(id).subscribe(
          next => {
            this.carList = next;
          }, error => {
            console.log('error');
            this.carList = new Array();
          }, () => {
            this.showAddCar = false;
            this.showCar = this.carList.length !== 0;
            this.router.navigateByUrl('/ticket/list');
          }
        );
      }
    );
  }
  search(): void{
    this.customerService.findAll().subscribe(
      next => {
        this.customerList = next;
      }, error => {
        this.customerList = new Array();
      }, () => {
        this.customerList = this.customerList.filter(res => {
          return res.nameCustomer.toLocaleLowerCase().match(this.key.toLocaleLowerCase());
        });
        console.log(this.customerList.length + ' li');
      }
    );
  }
  reset(): void{
    this.key = '';
    this.search();
  }

  deleteCustomer(id: number): void{
    console.log(id);
    this.customerService.deleteCustomer(id).subscribe(
      next => {},
      error => {},
      () => {
        this.curPage = 1;
        this.customerService.findAll().subscribe(
          next => {
            this.customerList = next;
          }, error => {
            this.customerList = new Array();
          }, () => {
            alert('Bạn đã xóa thành công!');
          }
        );
      }
    );
  }

  findByIdCustomer(id: number): void{
    this.customerService.findById(id).subscribe(
      next => {
        this.customerClass = next;
      }, error => {}
    );
  }

}
