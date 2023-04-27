import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECreateComponent } from './e-create.component';

describe('ECreateComponent', () => {
  let component: ECreateComponent;
  let fixture: ComponentFixture<ECreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
