import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesFormComponent } from './coordinates-form.component';

describe('CoordinatesFormComponent', () => {
  let component: CoordinatesFormComponent;
  let fixture: ComponentFixture<CoordinatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
