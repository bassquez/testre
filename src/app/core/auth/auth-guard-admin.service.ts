import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{
  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isAdmin;
  }

}
