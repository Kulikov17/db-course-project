import { TestBed } from '@angular/core/testing';

import { MapStatService } from './map-stat.service';

describe('MapStatService', () => {
  let service: MapStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
