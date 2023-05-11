import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResutlUserComponent } from './resutl-user.component';

describe('ResutlUserComponent', () => {
  let component: ResutlUserComponent;
  let fixture: ComponentFixture<ResutlUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResutlUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResutlUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
