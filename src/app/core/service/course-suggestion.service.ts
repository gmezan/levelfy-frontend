import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';

@Injectable()
export class CourseSuggestionService {
    constructor(private http: HttpClient) {}

    sendCourseSuggestion(courseSuggestion: CourseSuggestion) {
        console.log(courseSuggestion);
    }
}
