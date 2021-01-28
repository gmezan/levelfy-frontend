import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { url } from '../util/url.data';

/*
	General Framework for services
	Services DOES NOT subscribe to Observables
 */

const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export abstract class DataService<T> {
    private basePath: string = url;
    private readonly url: string;

    protected constructor(private uri: string, protected http: HttpClient) {
        this.url = this.basePath + uri;
    }

    // CRUD methods:

    public getAll(queryParams?: any): Observable<T[]> {
        let params = queryParams || {};
        return this.http
            .get<T[]>(this.url, { params: params })
            .pipe(catchError(this.handleError));
    }

    public get(id: string): Observable<T> {
        return this.http
            .get<T>(this.url + '/' + id)
            .pipe(catchError(this.handleError));
    }

    public create(resource: T): Observable<T> {
        return this.http
            .post<T>(this.url, resource)
            .pipe(catchError(this.handleError));
    }

    public update(resource: T): Observable<T> {
        return this.http
            .put<T>(this.url, resource)
            .pipe(catchError(this.handleError));
    }

    public delete(id: string): Observable<{}> {
        return this.http
            .delete(this.url + '/' + id)
            .pipe(catchError(this.handleError));
    }

    protected buildPath(uri: string): string {
        return this.basePath + uri;
    }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            alert('An unexpected error occurred');
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.

            if (error.status === 404) {
                console.log('404 error: not found');
            } else if (error.status === 400) {
                console.log('400 error: Bad request');
            } else if (error.status === 500) {
                console.log('500 error: Server error');
            }

            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }
}
