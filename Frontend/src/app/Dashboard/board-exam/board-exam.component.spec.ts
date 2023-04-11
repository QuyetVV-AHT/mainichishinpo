import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardExamComponent } from './board-exam.component';

describe('BoardExamComponent', () => {
  let component: BoardExamComponent;
  let fixture: ComponentFixture<BoardExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
