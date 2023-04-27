import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUpdateComponent } from './q-update.component';

describe('QUpdateComponent', () => {
  let component: QUpdateComponent;
  let fixture: ComponentFixture<QUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
