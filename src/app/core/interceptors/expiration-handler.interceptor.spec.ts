import { TestBed } from '@angular/core/testing';

import { ExpirationHandlerInterceptor } from './expiration-handler.interceptor';

describe('ExpirationHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExpirationHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExpirationHandlerInterceptor = TestBed.inject(ExpirationHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
