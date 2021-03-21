import { TestBed } from '@angular/core/testing';

import { OpenClientService } from './open-client.service';

describe('OpenClientService', () => {
  let service: OpenClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
