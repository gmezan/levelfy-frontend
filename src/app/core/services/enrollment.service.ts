import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { Course } from '../../shared/_models/course.model';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from '../../shared/_models/enrollment.model';

const uri = '/model/enrollment';

@Injectable({
    providedIn: 'root',
})
export class EnrollmentService extends DataService<Enrollment> {
    constructor(http: HttpClient) {
        super(uri, http);
    }
}
