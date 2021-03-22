import { TestBed } from '@angular/core/testing';

import { RoleClientService } from './role-client.service';

describe('RoleClientService', () => {
  let service: RoleClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
