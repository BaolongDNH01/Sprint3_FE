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

  constructor(private jwt: JwtService, private router: Router) {
    // dòng lệnh bắt login mới vào homepage
    // this.roles = jwt.getAuthorities();
    // if (this.roles.length === 0) {
    //   router.navigateByUrl('login');
    // }
  }

  ngOnInit(): void {
    this.userId = this.jwt.getUserId();
  }

}
