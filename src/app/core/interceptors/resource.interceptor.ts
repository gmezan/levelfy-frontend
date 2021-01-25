import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../common/token.service';

@Injectable()
export class ResourceInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = request;
        const token = this.tokenService.getToken();
        if (!token) {
            authReq = authReq.clone({
                headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + token
                ),
            });
        }
        return next.handle(authReq);
    }
}

export const resourceInterceptor = [
    { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true },
];
