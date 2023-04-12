import { TestBed } from '@angular/core/testing';

import { ResutlsService } from './resutls.service';

describe('ResutlsService', () => {
  let service: ResutlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResutlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
