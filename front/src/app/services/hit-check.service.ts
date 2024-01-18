import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserService} from './user.service';

import {Result} from '../main/results/results'

@Injectable({
  providedIn: 'root'
})
export class HitCheckService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getPointsRequest() {
    return this.http.get<Result[]>("http://localhost:8080/api/points", {
      observe: 'body', responseType: 'json', headers: {
        'Authorization': this.userService.getAuthToken().access_token
      }
    })
  }

  addPointRequest(x: number, y: number, r: number) {
    return this.http.post<Result[]>("http://localhost:8080/api/points/checkhit", {'x': x, 'y': y, 'r': r}, {
      observe: 'body', responseType: 'json', headers: {
        'Authorization': this.userService.getAuthToken().access_token
      }
    })
  }

  clearHits() {
    return this.http.get<Result[]>("http://localhost:8080/api/points/clear", {
      observe: 'body', responseType: 'json', headers: {
        'Authorization': this.userService.getAuthToken().access_token
      }
    })
  }

  // getCookie(name) {
  //   const nameEQ = name + "=";
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return null;
  // }

}
