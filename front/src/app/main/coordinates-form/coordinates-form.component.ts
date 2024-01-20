import {Component, OnInit, ViewChild} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HitUpdaterService} from '../../services/hit-update.service'

import {RegExValidator} from './regex-validator';
import {GraphComponent} from "../graph/graph.component";

@Component({
  selector: 'app-coordinates-form',
  templateUrl: './coordinates-form.component.html',
  styleUrls: ['./coordinates-form.component.css']
})
export class CoordinatesFormComponent implements OnInit {

  @Output() onRadiusChange = new EventEmitter<number>()

  hitService: HitUpdaterService;


  x = new FormControl(null, [
    Validators.required,
  ]);

  y = new FormControl(null, [
    Validators.required,
    RegExValidator.patternValidator(/\b-?\d\b/, {isInRange: true}),
    Validators.min(-3),
    Validators.max(3),
  ]);

  r = new FormControl('1', [
    Validators.required,
    Validators.min(0),
  ]);

  constructor(hitService: HitUpdaterService, private graphComponent: GraphComponent) {
    this.hitService = hitService;
  }

  ngOnInit() {
    this.changeRadius()
  }

  submit(): void {
    if (this.x.value && this.y.value && this.r.value) {
      this.hitService.addHit(this.x.value, this.y.value, Number.parseFloat(this.r.value));
    } else {
      this.x.markAsTouched();
      this.y.markAsTouched();
      this.r.markAsTouched();
    }
  }

  changeRadius() {
    if (this.r.value === '') return;
    if (this.r.value) {
      let numRad = Number.parseFloat(this.r.value);

      if (numRad < 0) {
        this.r.markAsTouched();
      }
      console.log("current radius", numRad)
      this.graphComponent.radius =  numRad;
      this.onRadiusChange.emit(numRad);
    }
  }

}
