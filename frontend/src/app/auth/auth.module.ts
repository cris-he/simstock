import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './service/auth.service';

@NgModule({
  providers: [AuthService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
