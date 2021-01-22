import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';
import { DataService } from '../common/data-service.service';

const uri = '/model/course-suggestion';

@Injectable()
export class CourseSuggestionService extends DataService<CourseSuggestion> {
    /*
    		TODO: get username if it's authenticated and send to backend
    */

    constructor(http: HttpClient) {
        super(uri, http);
    }
}
