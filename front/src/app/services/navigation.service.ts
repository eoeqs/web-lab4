import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
  }

  goToMain() {
    console.log("Go to main");
    this.router.navigate(['/main']);
  }

  goToLogin() {
    console.log("Go to login");
    this.router.navigate(['/login']);
  }

}
