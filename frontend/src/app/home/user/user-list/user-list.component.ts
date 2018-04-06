import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private my_rank;
  private myself;
  private users;
  private ready = false;
  constructor(
    private _auth: AuthService,
    private _backend: BackendService
  ) { }

  ngOnInit() {
    this._auth.is_authed().subscribe(__user => {
      this.myself = __user;
      this._backend.getUsers().subscribe(__data => {
        // console.log("users", __data);
        this.users = __data;
        for (let i = 0; i < __data.length; i++) {
          if (__user._id == __data[i]._id) {
            this.my_rank = i + 1;
            break;
          }
        }
        this.ready = true;
      })
    })

  }

}
