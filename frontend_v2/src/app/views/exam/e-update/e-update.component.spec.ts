import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EUpdateComponent } from './e-update.component';

describe('EUpdateComponent', () => {
  let component: EUpdateComponent;
  let fixture: ComponentFixture<EUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
