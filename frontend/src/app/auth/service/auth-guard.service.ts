import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private is_authed: boolean;
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate() {
    return true;
    // return !this._authService.is_authed();
  }

}
