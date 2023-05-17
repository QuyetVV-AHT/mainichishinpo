import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStartFillwordComponent } from './e-start-fillword.component';

describe('EStartFillwordComponent', () => {
  let component: EStartFillwordComponent;
  let fixture: ComponentFixture<EStartFillwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStartFillwordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EStartFillwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
