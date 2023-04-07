import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUpdateComponent } from './exam-update.component';

describe('ExamUpdateComponent', () => {
  let component: ExamUpdateComponent;
  let fixture: ComponentFixture<ExamUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
