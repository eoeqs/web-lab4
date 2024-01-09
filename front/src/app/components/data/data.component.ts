import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthTokenResponse, LoginRequest} from "../../model";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs";

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

  private readonly loginUrl = 'http://localhost:8080/web-4-eoeqs/api/users/check';
  private readonly registerUrl = 'http://localhost:8080/web-4-eoeqs/api/users/new';

  login() {
    this.proceedAuthRequest(this.loginUrl);
  }

  register() {
    this.proceedAuthRequest(this.registerUrl);
  }

  proceedAuthRequest(url : string) {
    this.http.post<AuthTokenResponse>(url, {
      username: this.model.username,
      password: this.model.password
    })
      .subscribe(res => {
          if (res) {
            this.sessionID = res.sessionID;

            localStorage.setItem(
              'token',
              this.sessionID
            );

            this.router.navigate(['main']).then(r => {
              if (!r) {
                console.error("something went wrong...");
              }
            });
          } else {
            console.error("auth failed");
          }
        },
        err => {
          alert(/<body.*?>([\s\S]*)<\/body>/.exec(err.error)![1]);
        }
      )
  }
  // proceedRegisterRequest(url: string) {
  //   const authRequest = {
  //     username: this.model.username,
  //     password: this.model.password
  //   };
  //
  //   this.http.post(url, authRequest)
  //     .pipe(
  //       tap((res: any) => {
  //         console.log(res);
  //         this.proceedAuthRequest(this.loginUrl);
  //       }),
  //       catchError((err) => {
  //         console.error("Registration failed", err);
  //         throw err;
  //       })
  //     )
  //     .subscribe();
  // }
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
