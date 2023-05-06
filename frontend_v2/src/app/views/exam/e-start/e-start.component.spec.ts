import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStartComponent } from './e-start.component';

describe('EStartComponent', () => {
  let component: EStartComponent;
  let fixture: ComponentFixture<EStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
