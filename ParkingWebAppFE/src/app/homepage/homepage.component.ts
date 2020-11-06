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
  userId: string;
  checkAdmin = false;

  constructor(private jwt: JwtService, private router: Router,
              private jwtService: JwtService,
  ) {
    // dòng lệnh bắt login mới vào homepage
    try {
      this.roles = jwt.getAuthorities();
      if (this.roles[0] === 'ROLE_ADMIN') {
        this.checkAdmin = true;
      }
    } catch (e) {
      this.roles = [];
    }
    if (this.roles.length === 0) {
      router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
    this.userId = this.jwt.getUserId();
  }

  logOut(): void {
    if (window.confirm('Are you sure to logout ?')) {
      this.jwtService.logOut();
      window.location.reload();
      window.location.href = 'login';
    }
    this.jwtService.saveUsername(window.localStorage.getItem('usernameRemember'));
  }
}
