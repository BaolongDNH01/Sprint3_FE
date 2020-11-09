import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Car } from '../../car/car';
import { CarService } from '../../car/car.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer;
  customerForm: FormGroup;
  carForm: FormGroup;
  car: Car;
  idCustomer: Customer;
  carId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private carService: CarService
  ) {
    // this.customerForm = this.fb.group({
    //   nameCustomer: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    //   birthday: ['', [Validators.required]],
    //   gender: ['', [Validators.required]],
    //   phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
    //   address: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]]
    // });
    // Họ tên phải viết hoa chữ cái đầu
    // Ngày sinh dd/MM/yyyy
    // Giới tính: chỉ được chọn nam hoặc nữ, mặc định là nam
    // Số điện thoại từ 10 - 12 số
    // Địa chỉ không được để trống
    // Email theo định dạng acb@def.com

  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      nameCustomer: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      birthday: new FormControl('', [Validators.required]),
      idCard: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cars: new FormControl([]),
    });
    this.carForm = new FormGroup({
      type: new FormControl(''),
      producer: new FormControl(''),
      color: new FormControl(''),
      license: new FormControl(''),
      parkings: new FormControl([]),
      ticket: new FormControl([]),
    });


  }


  customerSubmit(): void {
    console.log(this.customerForm.value);
    this.customer = Object.assign({}, this.customerForm.value);
    this.customerService.createCustomer(this.customer).subscribe(
      next => {
        console.log('Create process!');

        // Thien lưu tên khách hàng và biển số xe để tạo vé
        localStorage.setItem('customerName', this.customer.nameCustomer);
      }, error => {
        console.log('Create failed!');
      }, () => {
        this.customerService.findCustomerByIdCard(this.customerForm.value.idCard).subscribe(
          list => {
            this.idCustomer = list;
            this.carForm.value.customerId = this.idCustomer.id;

          }, error => {
          },
          () => {
            this.carService.findAllCar().subscribe(
              listCar => {
                this.carId = listCar.length + 1;
              }, error => {
              },
              () => {
                this.carSubmit();
              }
            );
            console.log(this.carForm.value);

          }
        );
      }
    );
    this.router.navigateByUrl('ticket/list');
  }

  submitAll(): void {
    this.customerSubmit();
  }

  carSubmit(): void {
    this.car = Object.assign({}, this.carForm.value);
    this.car.carId = this.carId;
    this.carService.addCar(this.car).subscribe(
      list => {
        localStorage.setItem('license', this.car.license);
      }, error => {
      }, () => {
      }
    );

  }
}
