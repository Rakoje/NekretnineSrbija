import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaNekretninaComponent } from './nova-nekretnina.component';

describe('NovaNekretninaComponent', () => {
  let component: NovaNekretninaComponent;
  let fixture: ComponentFixture<NovaNekretninaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaNekretninaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaNekretninaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
