import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../shared/_models/course.model';
import { catchError } from 'rxjs/operators';
import { CourseId } from '../../shared/_dto/courseId.model';
import { Service } from '../../shared/_models/service.model';
import { TeacherCoursesInfo } from '../../shared/_dto/teacher-courses-info.model';
import { ContactMessage } from '../../shared/_models/contact-message.model';
import { User } from '../../shared/_models/user.model';

const uri = '/open';

/*
    Open Services to everybody
 */

@Injectable({
    providedIn: 'root',
})
export class OpenClientService extends DataService<any> {
    apiSendSuggestion = '/open/course-suggestion';
    apiUriServiceListByCourse = '/open/service/list-by-course';
    apiUriServiceListByTeacher = '/open/service/list-by-teach';

    apiUriServiceFormByCourse = '/open/service/form-by-course';
    apiUriServiceFormByTeacher = '/open/service/form-by-teach';
    apiContactMessage = '/open/contact-message';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    sendSuggestion(courseS: CourseSuggestion): Observable<CourseSuggestion> {
        return this.http.post<CourseSuggestion>(
            this.buildPath(this.apiSendSuggestion),
            courseS
        );
    }

    getAvailableServiceByCourse(
        serviceType: string,
        university: string
    ): Observable<Course[]> {
        if (!serviceType) return null;
        let options = {
            params: new HttpParams()
                .set('serviceType', serviceType)
                .set('university', university),
        };
        return this.http
            .get<Course[]>(
                this.buildPath(this.apiUriServiceListByCourse),
                options
            )
            .pipe(catchError(this.handleError));
    }

    getAvailableServiceByTeacher(
        serviceType: string,
        university: string
    ): Observable<TeacherCoursesInfo[]> {
        if (!serviceType) return null;
        let options = {
            params: new HttpParams()
                .set('serviceType', serviceType)
                .set('university', university),
        };
        return this.http
            .get<TeacherCoursesInfo[]>(
                this.buildPath(this.apiUriServiceListByTeacher),
                options
            )
            .pipe(catchError(this.handleError));
    }

    public getServiceFormByServiceTypeAndCourse_CourseId(
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
            this.buildPath(this.apiUriServiceFormByCourse),
            options
        );
    }

    public getServiceFormByServiceTypeAndTeacher(
        serviceType: string,
        teachId: string
    ): Observable<Service[]> {
        if (!serviceType || !teachId) return null;

        let options = {
            params: new HttpParams()
                .set('serviceType', serviceType)
                .set('t', teachId),
        };

        return this.http.get<Service[]>(
            this.buildPath(this.apiUriServiceFormByTeacher),
            options
        );
    }

    postContactMessage(
        contactMessage: ContactMessage
    ): Observable<ContactMessage> {
        return this.http.post<ContactMessage>(
            this.buildPath(this.apiContactMessage),
            contactMessage
        );
    }
}
