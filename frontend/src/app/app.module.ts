import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';


import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import { AuthGuardService } from './auth/service/auth-guard.service';
import { HomeGuardService } from './home/service/home-guard.service';

import { ROUTES } from "./app.routes";




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    AuthModule,
    HomeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthGuardService,HomeGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
