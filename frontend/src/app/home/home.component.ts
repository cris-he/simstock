import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._authService.is_authed().subscribe(_data => {

    }, err => {
      if (err.status == 401) {
        this._router.navigate(['/login']);
      }

    });

    // this._authService.authed.subscribe(__state => {
    //   if (!__state) {
    //     this._router.navigate(['/login']);
    //   }
    // })
  }

}
