import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { StockListComponent } from './stock/stock-list/stock-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { ApiService } from './service/api.service';
import { BackendService } from './service/backend.service';


import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './shared/notfound/notfound.component';


@NgModule({
  providers: [ApiService, BackendService],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserListComponent,
    UserProfileComponent,
    UserEditComponent,
    StockListComponent,
    NavbarComponent,
    NotfoundComponent,
  ],
  exports: [
    HomeComponent,
    DashboardComponent
  ]
})
export class HomeModule { }
