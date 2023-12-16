import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginRequest} from "../../model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit, OnDestroy{
  time = new Date();
  intervalId: any;

  model: LoginRequest = new LoginRequest();
  sessionID = '';

  login() {
    const url = 'http://localhost:4200/web-4-eoeqs/app/login';
    // this.proceedAuthRequest(url);
  }

  ngOnDestroy(): void {
  }
  constructor(private router: Router,
              private http: HttpClient) {
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    if (localStorage.getItem('token')) {
      this.router.navigate(['main'])
    }
  }
}
