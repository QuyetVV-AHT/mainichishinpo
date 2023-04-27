import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UCreateComponent } from './u-create.component';

describe('UCreateComponent', () => {
  let component: UCreateComponent;
  let fixture: ComponentFixture<UCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
