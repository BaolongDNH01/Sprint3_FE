import {Component, OnInit} from '@angular/core';
import {JwtService} from '../login/service/jwt.service';
import {Router} from '@angular/router';
import {AuthService} from '../login/service/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  roles: string[];

  constructor(private jwt: JwtService, private router: Router,
              private authService: AuthService,
              private jwtService: JwtService,
  ) {

    // dòng lệnh bắt login mới vào homepage
    // this.roles = jwt.getAuthorities();
    // if (this.roles.length === 0) {
    //   router.navigateByUrl('login');
    // }
  }

  ngOnInit(): void {
    console.log(this.jwt.getUserId());
  }

}
