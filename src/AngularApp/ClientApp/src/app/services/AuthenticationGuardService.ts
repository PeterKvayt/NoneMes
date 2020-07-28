import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }

  public canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('authToken');
    if (token !== null) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
