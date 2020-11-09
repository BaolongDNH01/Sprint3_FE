import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../customer';
import {Router} from '@angular/router';
import {CustomerService} from '../customer.service';
import {Car} from '../../car/car';
import {CarService} from '../../car/car.service';

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

    // Họ tên không chứa kí tự đặc biệt
    // Ngày sinh yyyy-MM-dd
    // Giới tính: chỉ được chọn Nam hoặc Nữ
    // Số điện thoại phải đúng định dạng 08xxxxxxxx hoặc 09xxxxxxxx
    // Địa chỉ không được để trống
    // Email theo định dạng acb@def.com
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      nameCustomer: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +\n' +
        '            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +\n' +
        '            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\\\s]+$')]),
      birthday: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('([0-9]{9})$')]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^((09)|(08))\\d{8}$')]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')]),
      cars: new FormControl([]),
    });
    this.carForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      producer: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      license: new FormControl('', [Validators.required]),
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
    this.router.navigateByUrl('/list-customer');
  }

  submitAll(): void {
    this.customerSubmit();
  }

  carSubmit(): void {
    this.car = Object.assign({}, this.carForm.value);
    this.car.carId = this.carId;
    this.carService.addCar(this.car).subscribe(
      list => {
      }, error => {
      }, () => {
      }
    );
  }
}
