import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, RequiredValidator } from '@angular/forms';
import { AuthService } from '../service/auth.service';

import swal from 'sweetalert2';

function checkPwd(AC: AbstractControl) {
  let password = AC.get('password').value;
  let confirmPassword = AC.get('confirmPassword').value;
  if (password != confirmPassword) {
    AC.get('confirmPassword').setErrors({ checkPwd: true })
  }
  else {
    return null;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private creds;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {

    this.creds = {
      username: "",
      password: ""
    };

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: checkPwd
      });

    this._auth.is_authed().subscribe(_data => {
      this._router.navigate(['/home']);
    })
  }

  submit() {
    let new_user = {
      username: this.form.value.username,
      password: this.form.value.password,
      first: this.form.value.first,
      last: this.form.value.last,
    }
    this._auth.register(new_user).subscribe(__data => {
      this._router.navigate(['/home']);
      swal({
        title: "Hola, "+ __data.first + "!",
        text: "",
        type: "success",
      });
    }, __err => {
      if (__err.status == 500) {
        swal({
          title: "Username Exists!",
          text: "Please use another username",
          type: "error",
        });
      }
    })
  }

}
