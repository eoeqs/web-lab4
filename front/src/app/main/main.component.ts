import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainPageComponent implements OnInit {

  radius = 1;

  updateRadius(newRad: number) {
    this.radius = newRad;
  }

  constructor() { }

  ngOnInit() {
  }

}
