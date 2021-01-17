import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Course } from '../../shared/_models/course.model';

@Injectable()
export class CourseService {
    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:8080/course/dev/listAll';

    getCourses() {
        // Returns observable
        return this.http.get<Course[]>(this.apiUrl);
    }

    getAvailableCoursesByService(service: string) {
        return this.getCourses();
    }
}
