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
      this.updateDpath();
    }
  }

  constructor(hitService: HitUpdaterService) {
    this.hitService = hitService;
    this.updateDpath();
    for (let i = 30; i <= 270; i += 30) {
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

  updateDpath() {
    this.Dpath = `M 150 ${150 + this.r * 30}
                  L ${150 - this.r * 30} ${150 + this.r * 30}
                  L ${150 - this.r * 30} 150

                  L ${150 - this.r * 30} 150
                  L 150 ${150 - this.r * 30}
                  L 150 150
                  L ${150 + this.r * 30} 150
                  A ${this.r * 30} ${this.r * 30} 0 0 1 150 ${150 + this.r * 30}
                  `
  }

  checkHit(event: MouseEvent) {
    let x = Number.parseFloat(((event.offsetX - 150) / 40).toFixed(2));
    let y = Number.parseFloat(((event.offsetY - 150) / -40).toFixed(2));
    if (x < -3 || x > 5 || y < -3 || y > 3) return;
    if (this.r >= 0) {
      this.hitService.addHit(x, y, this.r);
    }
  }

}
