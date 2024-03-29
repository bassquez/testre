import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{
  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.loggedIn;
  }
}
