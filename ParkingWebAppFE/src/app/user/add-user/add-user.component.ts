import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['Nam', [Validators.required]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12)]],
      address: ['', [Validators.required]],
      rank: ['1', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.user = Object.assign({}, this.userForm.value);
    this.user.username = this.user.email;

    this.userService.save(this.user).subscribe(
      next => {
        console.log('Create process!');
      }, error => {
        console.log('Create failed!');
      }, () => {
        this.router.navigateByUrl('/list-user');
      }
    );
  }
}
