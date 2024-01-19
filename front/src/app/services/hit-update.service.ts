import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

import {Result} from '../main/results/results'
import {HitCheckService} from './hit-check.service'

@Injectable({
  providedIn: 'root'
})
export class HitUpdaterService {

  private hitRequestStatusStorage = new Subject<Result[]>();

  hitRequestStatus$ = this.hitRequestStatusStorage.asObservable();

  constructor(private hitCheckService: HitCheckService) {

  }

  addHit(x: number, y: number, r: number): void {
    this.hitCheckService.addPointRequest(x, y, r)
      .subscribe({
        next: value => {
          this.hitRequestStatusStorage.next(value)
        }
      })
  };

  getAllHits(): Observable<Result[]> {
    this.hitCheckService.getPointsRequest()
      .subscribe({
        next: value => {
          this.hitRequestStatusStorage.next(value)
        }
      })

    return this.hitRequestStatusStorage.asObservable();
  };


  clearHits() {
    this.hitCheckService.clearHits()
      .subscribe({
        next: value => {
          this.hitRequestStatusStorage.next(value);
        }
      })
  }
}
