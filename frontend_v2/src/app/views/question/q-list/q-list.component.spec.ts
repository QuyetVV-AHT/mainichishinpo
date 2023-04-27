import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QListComponent } from './q-list.component';

describe('QListComponent', () => {
  let component: QListComponent;
  let fixture: ComponentFixture<QListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
