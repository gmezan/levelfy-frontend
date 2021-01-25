import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Course } from '../../shared/_models/course.model';
import { DataService } from '../common/data-service.service';

const uri = '/model/course';

@Injectable()
export class CourseService extends DataService<Course> {
    // URI for all courses
    apiUriService = '/model/course/list';
    apiUriCourseByUniv = '/model/course/univ';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    getAvailableCoursesByService(serviceType: string): Observable<Course[]> {
        if (!serviceType) return null;
        let options = {
            params: new HttpParams().set('serviceType', serviceType),
        };

        return this.http
            .get<Course[]>(this.buildPath(this.apiUriService), options)
            .pipe(catchError(this.handleError));
    }

    findCourseByCourseId_University(u: string): Observable<Course[]> {
        if (!u) return null;
        let options = {
            params: new HttpParams().set('u', u),
        };
        return this.http
            .get<Course[]>(this.buildPath(this.apiUriCourseByUniv), options)
            .pipe(catchError(this.handleError));
    }

    /*

        For DELETE and POST consider using local list variable  to y
        update the list according to the changes, to avoid load all data again

    */
}
