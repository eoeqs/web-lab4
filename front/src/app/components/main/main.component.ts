import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GraphPoint, PostResponse, Result, ResultRequest} from "../../model";

declare function enable_graph() : void;
declare function on_main_load() : void;
declare function drawGraphByR(r : number) : void;
declare function drawPointXYRRes(x : number, y : number, r : number, result : boolean) : void;
declare function clearAllPoints() : void;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit {
  private readonly checkHitUrl = 'http://localhost:8080/web-4-eoeqs/api/points/new';
  constructor(private http: HttpClient, private router: Router) {
  }

  y_select: number = 0;
  x_select: string = '0';
  r_select: string = '1';
  results: Result[] = [];

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    on_main_load();
    this.http.get<Result[]>(this.checkHitUrl).subscribe(
      {
        next: (resp: Result[]) => {
          this.results = resp;
          resp.forEach(res => {
            drawPointXYRRes(res.request.x, res.request.y, res.request.r, res.result);
          })
          drawGraphByR(Number(this.r_select));
        },

        error: (err) => {
          console.error(err);
          console.log(err.message);
        }
      }
    )
  }

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.x_select, this.y_select, this.r_select);
      this.sendData();
    } else {
      console.error('Form is invalid');
    }
  }

  sendData() {
    const request = new ResultRequest();
    request.x = Number(this.x_select);
    request.y = this.y_select;
    request.r = Number(this.r_select);
    this.sendCheckRequest(request);
  }

  @HostListener('window:onGraph', ['$event.detail'])
  onLogin(detail : GraphPoint) {
    const request = new ResultRequest();
    request.x = detail.x;
    request.y = detail.y;
    request.r = Number(this.r_select);
    this.sendCheckRequest(request);
  }

  sendCheckRequest(request : ResultRequest) {
    this.http.post<Result>(this.checkHitUrl, request)
      .subscribe((res : Result) => {
          if (res) {
            this.results.push(res);
            drawPointXYRRes(res.request.x, res.request.y, res.request.r, res.result);
          }
        }
      )
  }
  clearTable() {
    this.http.delete(this.checkHitUrl).subscribe(
      {
        next: () => {
          this.results = []
          clearAllPoints();
        },

        error: (err) => {
          console.error(err);
          console.log(err.message);
        }
      }
    );
  }
  // logout() {
  //   this.http.delete(environment.backendURL + "/app/logout").subscribe(() => {
  //     sessionStorage.removeItem('token');
  //     this.router.navigate(['']).then(r => {
  //       if (!r) {
  //         console.error("something went wrong...");
  //       }
  //     });
  //   });
  // }

  onRChange() {
    drawGraphByR(Number(this.r_select));
  }

  enable_graph() {
    enable_graph();
  }
}
