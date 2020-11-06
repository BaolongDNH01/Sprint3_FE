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
  curPage = 1;

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.listUser().subscribe(
      list => {
        this.listUser = list;
        // xóa hiện thị admin
        this.listUser.splice(0, 1);
      }
    );
  }

  // tslint:disable-next-line:typedef
  delete(id) {
    if (confirm('Are you sure to delete ' + id)) {
      this.userService.delete(id).subscribe();
      location.reload();
    }

  }
}
