import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.css' ]
})
export class LoginFormComponent  {

  constructor(private userService: UserService, private navigationService: NavigationService) { }

  loginErrorMessage: string = "Username or password does not match";
  loginError: boolean = false;
  signUpErrorMessage: string = "User already exists";
  signUpError: boolean = false;

  login = new FormControl('', [Validators.required,]);
  password = new FormControl('', [Validators.required,]);

  print() : void {
    console.log(this.login.value);
    console.log(this.password.value);
  }

  async signIn() {
    console.log(this.login.valid,this.password.valid)
    if (this.login.valid && this.password.valid) {

      this.print();
      this.userService.signIn(this.login.value, this.password.value);
      await new Promise(f => setTimeout(f, 200));
      if (this.userService.isLoggedIn()) {
        console.log("logged in. token=", this.userService.getAuthToken().access_token);
        this.navigationService.goToMain();
        this.loginError = false;
      } else {
        this.loginError = true;
      }
    } else {
      this.login.markAsTouched();
      this.password.markAsTouched();
    }
  }

  signUp() {
    if (this.login.valid && this.password.valid) {
      this.print();
      if (this.login.value && this.password.value) {
      this.userService.signUp(this.login.value, this.password.value);
      console.log("we're currently signing up")
      if (this.userService.isSignedUp()) {
        console.log("signed up");
        this.signUpError = false;
      } else {
        this.signUpError = true;
      }

      // this.signIn();
      } else {
        console.log("invalid un or pw")
      }
    } else {
      this.login.markAsTouched();
      this.password.markAsTouched();
    }
  }

}
