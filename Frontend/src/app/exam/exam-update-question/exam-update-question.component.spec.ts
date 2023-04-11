import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUpdateQuestionComponent } from './exam-update-question.component';

describe('ExamUpdateQuestionComponent', () => {
  let component: ExamUpdateQuestionComponent;
  let fixture: ComponentFixture<ExamUpdateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamUpdateQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamUpdateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
