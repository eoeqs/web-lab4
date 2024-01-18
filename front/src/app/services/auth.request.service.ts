import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../utils/auth.data'
import { AuthToken } from '../utils/auth.token'

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  constructor(private http: HttpClient) { }

  signUpRequest(authData: AuthData) {
    return this.http.post<AuthData>("http://localhost:8080/user/save", authData, {observe: 'body', responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }});
  }

  signInRequest(username: string, password: string) {
    return this.http.post<AuthToken>("http://localhost:8080/user/auth?username=" + username + "&password=" + password, {'username': username, 'password': password},
      {headers: {
          'Content-Type': 'application/json',
          'username': username,
          'password': password
        }});
  }

}
