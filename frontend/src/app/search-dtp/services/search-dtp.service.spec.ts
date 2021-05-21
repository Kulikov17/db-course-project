import { TestBed } from '@angular/core/testing';

import { SearchDtpService } from './search-dtp.service';

describe('SearchDtpService', () => {
  let service: SearchDtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
