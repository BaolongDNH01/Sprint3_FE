import { TestBed } from '@angular/core/testing';

import { ParkingReService } from './parking-re.service';

describe('ParkingReService', () => {
  let service: ParkingReService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingReService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
