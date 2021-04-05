import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../security/auth.service';

@Injectable()
export class ExpirationHandlerInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const started = Date.now();
        let ok: string;

        // extend server response observable with logging
        return next.handle(req).pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                (event) =>
                    (ok = event instanceof HttpResponse ? 'succeeded' : ''),
                // Operation failed; error is an HttpErrorResponse
                (error) => {
                    let httpErrorResponse = error as HttpErrorResponse;
                    if (httpErrorResponse.status === 401) {
                        this.authService.logout();
                    }
                }
            )
        );
    }
}

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ExpirationHandlerInterceptor,
        multi: true,
    },
];
