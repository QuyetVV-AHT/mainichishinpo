import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UUpdateComponent } from './u-update.component';

describe('UUpdateComponent', () => {
  let component: UUpdateComponent;
  let fixture: ComponentFixture<UUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
