import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  listUser: User[];

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.listUser().subscribe(
      list => {
        this.listUser = list;
        console.log(this.listUser);
      }
    );
  }

}
