import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';
import { DataService } from '../common/data-service.service';
import { Observable } from 'rxjs';

const uri = '/model/course-suggestion';

@Injectable()
export class CourseSuggestionService extends DataService<CourseSuggestion> {
    constructor(http: HttpClient) {
        super(uri, http);
    }
}
