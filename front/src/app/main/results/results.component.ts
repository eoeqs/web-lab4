import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Result } from './results';
import { HitUpdaterService } from '../../services/hit-update.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  hitServiceSubscription!: Subscription;
  results : Result[] = [];
  hitService : HitUpdaterService;

  constructor(hitService : HitUpdaterService) {
    this.hitService = hitService;
  }

  ngOnInit() {

    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        if (value != null && value != undefined) {
          if (value.length >= this.results.length) {
            this.results = value;
          } else {
            this.results.push(value as unknown as Result);
          }

        }
      }
    });

    this.hitService.getAllHits();
  }

  refresh(){
    this.results = [];
    this.hitService.clearHits();
  }
}
