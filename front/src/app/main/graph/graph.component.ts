import {Component, OnInit, Input} from '@angular/core';
import {Subscription} from "rxjs";

import {Result} from '../results/results';
import {HitUpdaterService} from '../../services/hit-update.service'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  hitServiceSubscription!: Subscription;
  private resultsGraph: Result[] = [];
  hitService: HitUpdaterService;

  getResults(): Result[] {
    console.log("results", this.resultsGraph);
    return this.resultsGraph;
  }

  readonly dashes = Array<number>();
  r = 1;
  Dpath = '';

  @Input() set radius(num: number) {
    this.r = num;
    if (this.r >= 0) {
      this.drawDpath();

    }
  }

  constructor(hitService: HitUpdaterService) {
    this.hitService = hitService;

    this.drawDpath();
    for (let i = 50; i <= 250; i += 50) {
      this.dashes.push(i);
    }
  }

  ngOnInit() {
    this.hitServiceSubscription = this.hitService.hitRequestStatus$.subscribe({
      next: value => {
        if (value.length >= this.resultsGraph.length) {
          this.resultsGraph = value;
        } else {
          if (value.length == 0) {
            this.resultsGraph = value;
          }
        }
      }
    });
  }

  drawDpath() {
    this.Dpath = `M 200 150 L 150 150 L 150 50 C 100 50 50 100 50 150 L 50 200 L 150 200 L 200 150`

  }



  checkHit(event: MouseEvent) {
    let x = Number.parseFloat(((event.offsetX - 150) / 100).toFixed(2));
    let y = Number.parseFloat(((event.offsetY - 150) / -100).toFixed(2));
    console.log(x,y)
    if (x < -3 || x > 5 || y < -3 || y > 3) return;
    if (this.r >= 0) {
      this.hitService.addHit(x, y, this.r);
    }
  }

}
