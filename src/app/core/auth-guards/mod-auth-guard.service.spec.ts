import { TestBed } from '@angular/core/testing';

import { ModAuthGuard } from './mod-auth-guard.service';

describe('ModAuthGuardService', () => {
    let service: ModAuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModAuthGuard);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
