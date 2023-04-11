import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPublicComponent } from './exam-public.component';

describe('ExamPublicComponent', () => {
  let component: ExamPublicComponent;
  let fixture: ComponentFixture<ExamPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
