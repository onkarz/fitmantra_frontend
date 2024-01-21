import { TestBed } from '@angular/core/testing';

import { FitmantraService } from './fitmantra.service';

describe('FitmantraService', () => {
  let service: FitmantraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitmantraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
