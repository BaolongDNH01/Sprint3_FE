import {Component, OnInit} from '@angular/core';
import {User} from '../../user/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../customer';
import {Router} from '@angular/router';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer;
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      nameCustomer: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    // Họ tên phải viết hoa chữ cái đầu
    // Ngày sinh dd/MM/yyyy
    // Giới tính: chỉ được chọn nam hoặc nữ, mặc định là nam
    // Số điện thoại từ 10 - 12 số
    // Địa chỉ không được để trống
    // Email theo định dạng acb@def.com

  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.customer = Object.assign({}, this.customerForm.value);
    this.customer.nameCustomer = this.customer.email;

    this.customerService.createCustomer(this.customer).subscribe(
      next => {
        console.log('Create process!');
      }, error => {
        console.log('Create failed!');
      }
    );
    this.router.navigateByUrl('/list-customer');
  }

}
