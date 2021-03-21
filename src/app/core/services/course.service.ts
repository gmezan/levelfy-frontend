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
    apiUploadImage = '/s3/course/';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    uploadImage(id: string, form: FormData): Observable<any> {
        if (!id) return null;
        let url = this.buildPath(this.apiUploadImage + id);
        return this.http.post<any>(url, form);
    }
}
