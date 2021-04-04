import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Enrollment } from '../../shared/_models/enrollment.model';
import { Observable } from 'rxjs';
import { ServiceSession } from '../../shared/_models/service-session.model';
import { Service } from '../../shared/_models/service.model';

const uri = 't';

@Injectable({
    providedIn: 'root',
})
export class RoleTeachService extends DataService<any> {
    private apiServiceSessionList = '/t/service-session';
    private apiEnrollmentList = '/t/enrollments';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    getServiceSessionList(service: Service): Observable<ServiceSession[]> {
        let options = {
            params: new HttpParams().set(
                'serviceId',
                String(service.idService)
            ),
        };

        return this.http.get<ServiceSession[]>(
            this.buildPath(this.apiServiceSessionList),
            options
        );
    }

    getEnrollmentList(service: Service): Observable<Enrollment[]> {
        let options = {
            params: new HttpParams().set(
                'serviceId',
                String(service.idService)
            ),
        };

        return this.http.get<Enrollment[]>(
            this.buildPath(this.apiEnrollmentList),
            options
        );
    }
}
