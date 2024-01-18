import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): true | UrlTree {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }

}
