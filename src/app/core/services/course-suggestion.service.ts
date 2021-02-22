import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';
import { DataService } from '../common/data-service.service';
import { Observable } from 'rxjs';

const uri = '/model/course-suggestion';

@Injectable()
export class CourseSuggestionService extends DataService<CourseSuggestion> {
    /*
    		TODO: get username if it's authenticated and send to backend
    */

    apiSendSuggestion = '/model/course-suggestion/open';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    sendSuggestion(courseS: CourseSuggestion): Observable<CourseSuggestion> {
        return this.http.post<CourseSuggestion>(
            this.buildPath(this.apiSendSuggestion),
            courseS
        );
    }
}
