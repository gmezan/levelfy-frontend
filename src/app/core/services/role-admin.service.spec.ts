import { TestBed } from '@angular/core/testing';

import { RoleAdminService } from './role-admin.service';

describe('RoleAdminService', () => {
  let service: RoleAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
