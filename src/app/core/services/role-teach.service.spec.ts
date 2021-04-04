import { TestBed } from '@angular/core/testing';

import { RoleTeachService } from './role-teach.service';

describe('RoleTeachService', () => {
  let service: RoleTeachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleTeachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
