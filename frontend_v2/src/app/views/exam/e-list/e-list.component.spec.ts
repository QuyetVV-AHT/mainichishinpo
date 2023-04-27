import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EListComponent } from './e-list.component';

describe('EListComponent', () => {
  let component: EListComponent;
  let fixture: ComponentFixture<EListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
