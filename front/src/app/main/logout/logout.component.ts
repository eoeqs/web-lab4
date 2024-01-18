import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logOut();
    this.navigationService.goToLogin();
  }
}
