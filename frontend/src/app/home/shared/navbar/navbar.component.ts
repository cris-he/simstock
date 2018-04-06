import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout().subscribe(_res => {
      this._router.navigate(['/login']);
    }, err => {
      swal({
        title: err.status,
        text: err.message,
        type: "error",
      });
    });
  }

}
