import { TestBed } from '@angular/core/testing';

import { ClientAuthGuard } from './client-auth-guard.service';

describe('ClientAuthGuardService', () => {
    let service: ClientAuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClientAuthGuard);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
