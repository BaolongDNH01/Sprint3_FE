import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInfo} from '../models/login-info';
import {AuthService} from '../service/auth.service';
import {JwtService} from '../service/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;
  isLogInFailed = false;
  isLoggedIn = false;

  userId: string;
  roles: string[] = [];
  username: string;
  authority: string;
  email: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private jwtService: JwtService,
              private router: Router,
  ) {
  }

  onLogin(): void {
    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.authLogin(this.loginInfo);

  }

  authLogin(loginInfo: LoginInfo): void {
    this.subscription = this.authService.authLogin(loginInfo).subscribe({
      next: data => {
        this.jwtService.saveUserId(data.userId);
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
        this.jwtService.saveEmail(data.email);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.isLogInFailed = true;
      },
    });
  }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.jwtService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.jwtService.getUsername();
      this.roles = this.jwtService.getAuthorities().map(r => r.replace('ROLE_', '').toLowerCase());
      this.email = this.jwtService.getEmail();

      // Handling authorities granted
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MEMBER') {
          this.authority = 'member';
          return false;
        }
        return true;
      });
    }
  }
}
