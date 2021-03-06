import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {JwtService} from './service/jwt.service';
import {AuthService} from './service/auth.service';
import {AuthHttpInterceptor} from './auth/auth-http.interceptor';
import {FormatUsernameService} from './service/format-username.service';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, JwtService, AuthHttpInterceptor, FormatUsernameService]

})
export class LoginModule {
}
