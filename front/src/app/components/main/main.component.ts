import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Result} from "../../model";

declare function on_main_load(): void;

declare function clearAllPoints(): void;


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit {
  private readonly logoutUrl = 'http://localhost:8080/web-4-eoeqs/app/logout';
  private readonly checkHitUrl = 'http://localhost:8080/web-4-eoeqs/app/check-hit';
  private readonly helloUrl = 'http://localhost:8080/web-4-eoeqs/app/hello';
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
    this.http.get<any>(this.helloUrl).subscribe(
      {
        next: (resp) => {
          console.log(resp.message);
        },
        error: (err) => {
          console.error(err);
          console.log(err.message);
          console.error('Failed to load hello message.');
          this.router.navigate(['']).then((navigationSuccess: boolean) => {
            if (!navigationSuccess) {
              console.error('Something went wrong during navigation...');
            }
          });
        }
      }
    );
  }

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.x_select, this.y_select, this.r_select);
      this.sendData();
    } else {
      console.error('Form is invalid');
    }
  }

  sendData(): void {
    const data = {
      x: this.x_select,
      y: this.y_select,
      r: this.r_select
    };

    this.http.post<Result>('http://your-api-url', data)
      .subscribe(
        (result: Result) => {
          console.log('Data sent successfully:', result);
          this.results.push(result);
        },
        error => {
          console.error('Error sending data:', error);
        }
      );
  }

  clearTable(): void {
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

  logout(): void {
    this.http.delete(this.logoutUrl).subscribe(() => {
      sessionStorage.removeItem('token');
      this.router.navigate(['']).then(r => {
        if (!r) {
          console.error("something went wrong...");
        }
      });
    });
  }
}
