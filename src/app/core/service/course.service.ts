import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Course } from '../../shared/_models/course.model';
import { GeneralService } from './_general-service.service';

@Injectable()
export class CourseService extends GeneralService {
    // URI for all courses
    apiUriAll = '/course/dev/listAll';
    apiUriService = '/course/list';

    getCourses() {
        // Returns observable
        return this.http
            .get<Course[]>(this.buildPath(this.apiUriAll))
            .pipe(catchError(CourseService.handleError));
    }

    getAvailableCoursesByService(serviceType: string): Observable<Course[]> {
        if (!serviceType) return null;
        let options = {
            params: new HttpParams().set('serviceType', serviceType),
        };

        return this.http
            .get<Course[]>(this.buildPath(this.apiUriService), options)
            .pipe(catchError(CourseService.handleError));
    }
}
