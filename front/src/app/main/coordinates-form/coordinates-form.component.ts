import {Component, OnInit} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HitUpdaterService} from '../../services/hit-update.service'

import {RegExValidator} from './regex-validator';

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

  r = new FormControl(null, [
    Validators.required,
    Validators.min(0),
  ]);

  constructor(hitService: HitUpdaterService) {
    this.hitService = hitService;
  }

  ngOnInit() {
  }

  submit(): void {
    if (this.x.value && this.y.value && this.r.value) {
      this.hitService.addHit(this.x.value, this.y.value, this.r.value);
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
      this.onRadiusChange.emit(numRad);
    }
  }

}
