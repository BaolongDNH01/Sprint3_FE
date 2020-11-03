import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../User';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.userService.findUserById(id).subscribe((next) => {
        this.user = next;
      }, error => {
        this.user = new User();
      });
    });
  }
}
