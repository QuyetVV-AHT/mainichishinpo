import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EStartAudioFillwordComponent } from './e-start-audio-fillword.component';

describe('EStartAudioFillwordComponent', () => {
  let component: EStartAudioFillwordComponent;
  let fixture: ComponentFixture<EStartAudioFillwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EStartAudioFillwordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EStartAudioFillwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
