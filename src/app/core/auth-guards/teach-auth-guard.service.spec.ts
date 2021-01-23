import { TestBed } from '@angular/core/testing';

import { TeachAuthGuard } from './teach-auth-guard.service';

describe('TeachAuthGuardService', () => {
    let service: TeachAuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TeachAuthGuard);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
