import { TestBed } from '@angular/core/testing';

import { OglasivacService } from './oglasivac.service';

describe('OglasivacService', () => {
  let service: OglasivacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OglasivacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
