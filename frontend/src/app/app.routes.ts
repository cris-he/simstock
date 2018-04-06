import { Routes } from '@angular/router';

// Auth Components
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Home Components
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { StockListComponent } from './home/stock/stock-list/stock-list.component';
import { UserListComponent } from './home/user/user-list/user-list.component';


import { AuthGuardService } from './auth/service/auth-guard.service';
import { HomeGuardService } from './home/service/home-guard.service';


export const ROUTES: Routes = [
  // Main Redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // App Views
  {
    path: '', component: HomeComponent,
    // canActivate: [HomeGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'index', redirectTo: 'home', pathMatch: 'full' },
      { path: 'index.html', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'market', component: StockListComponent },
      { path: 'rank', component: UserListComponent },

    ]
  },
  {
    path: '', component: AuthComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },

  // Handle all other routes
  // If the user already logged in, will redirect to dashboard
  { path: '**', redirectTo: 'login' }
]