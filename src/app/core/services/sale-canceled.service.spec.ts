import { TestBed } from '@angular/core/testing';

import { SaleCanceledService } from './sale-canceled.service';

describe('SaleCanceledService', () => {
  let service: SaleCanceledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleCanceledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
