import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../shared/_models/course.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CourseId } from '../../shared/_dto/courseId.model';
import { Service } from '../../shared/_models/service.model';
import { DataService } from '../common/data-service.service';

const uri = '/model/service';

@Injectable({
    providedIn: 'root',
})
export class ServiceService extends DataService<Service> {
    apiUriServiceForm = '/model/service/form';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    public findServiceByServiceTypeAndCourse_CourseId(
        serviceType: string,
        courseId: CourseId
    ): Observable<Service[]> {
        if (!serviceType || !courseId) return null;

        let options = {
            params: new HttpParams()
                .set('serviceType', serviceType)
                .set('u', courseId.university)
                .set('i', courseId.idCourse),
        };

        return this.http.get<Service[]>(
            this.buildPath(this.apiUriServiceForm),
            options
        );
    }
}
