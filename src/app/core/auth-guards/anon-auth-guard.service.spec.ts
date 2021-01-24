import { TestBed } from '@angular/core/testing';

import { AnonAuthGuard } from './anon-auth-guard.service';

describe('AnonAuthGuardService', () => {
  let service: AnonAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
