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
    apiEnrollment = '/c/enrollment';
    apiIsAlreadyEnrolled = '/c/is-enrolled';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    // To check if a user is already enrolled in a service
    isAlreadyEnrolled(enrollment: Enrollment): Observable<Enrollment> {
        return this.http.post<Enrollment>(
            this.buildPath(this.apiIsAlreadyEnrolled),
            enrollment
        );
    }

    // To get the enrollments of the user
    getEnrollments(serviceType: string): Observable<Enrollment[]> {
        let options = serviceType
            ? {
                  params: new HttpParams().set('serviceType', serviceType),
              }
            : {};

        return this.http.get<Enrollment[]>(
            this.buildPath(this.apiEnrollment),
            options
        );
    }

    // To get an enrollment
    getEnrollment(id: string) {
        return this.http.get<Enrollment>(
            this.buildPath(this.apiEnrollment + '/' + id)
        );
    }

    // To create a new enrollment
    postEnrollment(enrollment: Enrollment) {
        return this.http.post<Enrollment>(
            this.buildPath(this.apiEnrollment),
            enrollment
        );
    }

    // To create a new enrollment
    deleteEnrollment(enrollment: Enrollment) {
        return this.http.delete<Enrollment>(
            this.buildPath(this.apiEnrollment + '/' + enrollment.idEnrollment)
        );
    }
}
