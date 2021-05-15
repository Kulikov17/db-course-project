import { TestBed } from '@angular/core/testing';

import { TsService } from './ts.service';

describe('TsService', () => {
  let service: TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
