import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAgencijaComponent } from './nova-agencija.component';

describe('NovaAgencijaComponent', () => {
  let component: NovaAgencijaComponent;
  let fixture: ComponentFixture<NovaAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaAgencijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
