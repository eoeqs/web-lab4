import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2
} from '@angular/core';
import {Subscription} from "rxjs";

import {Result} from '../results/results';
import {HitUpdaterService} from '../../services/hit-update.service'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @ViewChildren('circle') circleElements?: QueryList<ElementRef>;
  hitServiceSubscription!: Subscription;
  private resultsGraph: Result[] = [];
  hitService: HitUpdaterService;


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

  isPointInArea(x: number, y: number, r: number): boolean {
    return this.isRectangle(x, y, r) || this.isTriangle(x, y, r) || this.isSector(x, y, r);
  }

  private isTriangle(x: number, y: number, r: number): boolean {
    return x >= 0 && y <= 0 && x - y <= r / 2;
  }

  private isSector(x: number, y: number, r: number): boolean {
    return x <= 0 && y >= 0 && x * x + y * y <= r * r;
  }

  private isRectangle(x: number, y: number, r: number): boolean {
    return x <= 0 && y <= 0 && x >= -r && y >= -r / 2;
  }

  getResults(): Result[] {

    this.resultsGraph.forEach(point => {
      point.result = this.isPointInArea(point.x, point.y, this.radius);
    });
    return this.resultsGraph;
  }


  readonly dashes = Array<number>();
  r = 1;
  Dpath = '';

  @Input() set radius(num: number) {
    this.r = num;
    console.log(this.r)
  }

  get radius(): number {
    return this.r;
  }

  constructor(private cdr: ChangeDetectorRef, hitService: HitUpdaterService, private renderer: Renderer2) {
    this.hitService = hitService;
    this.drawDpath();
    for (let i = 50; i <= 250; i += 50) {
      this.dashes.push(i);
    }
  }


  drawDpath() {
    this.Dpath = `M 200 150 L 150 150 L 150 50 C 100 50 50 100 50 150 L 50 200 L 150 200 L 200 150`
  }


  checkHit(event: MouseEvent) {
    console.log(event.offsetX, event.offsetY)
    let x = Number.parseFloat(((event.offsetX - 150) / 100 * this.r).toFixed(2));
    let y = Number.parseFloat(((event.offsetY - 150) / -100 * this.r).toFixed(2));
    if (x < -3 || x > 5 || y < -3 || y > 3) return;
    if (this.r >= 0) {
      this.hitService.addHit(x, y, this.r);
    }
  }

}
