import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../../shared/_models/enrollment.model';
import { catchError } from 'rxjs/operators';

const uri = 'c';

@Injectable({
    providedIn: 'root',
})
export class RoleClientService extends DataService<any> {
    apiGetEnrollments = '/c/enrollment';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    getEnrollments(serviceType: string): Observable<Enrollment[]> {
        let options = {
            params: new HttpParams().set('serviceType', serviceType),
        };

        return this.http.get<Enrollment[]>(
            this.buildPath(this.apiGetEnrollments),
            options
        );
    }
}
