import {Injectable} from '@angular/core';

import {AuthRequestService} from './auth.request.service';

import {AuthToken} from '../utils/auth.token'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedInVal: boolean = false;
  private isSignedUpVal: boolean = false;
  private loginErrorMessage: string = '';
  private signUpErrorMessage: string = '';
  private authToken: AuthToken = {access_token: ''};

  constructor(private authRequestService: AuthRequestService) {
  }

  getAuthToken() {
    return this.authToken;
  }

  isLoggedIn() {
    return this.isLoggedInVal;
  }

  isSignedUp() {
    return this.isSignedUpVal;
  }

  getLoginErrorMessage() {
    return this.loginErrorMessage;
  }

  getSignUpErrorMessage() {
    return this.signUpErrorMessage;
  }

  signUp(username: string, password: string) {
    if (username && password) {
      console.log("this is un and pw", username, password)
      this.authRequestService.signUpRequest({'username': username, 'password': password, 'error': ''}).subscribe({
        next: value => {
          console.log(value);
          if (value != undefined) {
            console.log("Succesfully signed up");
            this.isSignedUpVal = true;
            this.signUpErrorMessage = '';
            this.signIn(username,password);
            } else {
            console.error("Problem with response after sign up request")
          }
        }
      })
    }
  }

  signIn(username: string | null, password: string | null) {
    if (username && password) {
      this.authRequestService.signInRequest(username, password).subscribe({
        next: value => {
          console.log(value);
          this.authToken.access_token = value.access_token;
          if (value != undefined && this.authToken != undefined) {
            this.isLoggedInVal = true;
            this.loginErrorMessage = '';

          } else {
            this.authToken = {access_token: ''};
            this.isLoggedInVal = false;
            this.loginErrorMessage = 'Can\'t sign in';
            console.error("invalid auth token");
          }
        }
      })
    }
  }

  logOut() {
    this.authToken.access_token = '';
    this.isLoggedInVal = false;
    this.loginErrorMessage = '';
  }

}
