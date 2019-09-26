import { TestBed } from '@angular/core/testing';

import { AcronymService } from './acronym.service';

describe('AcronymService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcronymService = TestBed.get(AcronymService);
    expect(service).toBeTruthy();
  });
});
