import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Injectable()
export class HomeGuardService implements CanActivate {

  constructor(private _authService: AuthService) { }

  canActivate() {
    return true;
    // return this._authService.is_authed();
  }

}
