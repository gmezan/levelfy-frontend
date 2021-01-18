import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';
import { GeneralService } from './_general-service.service';

@Injectable()
export class CourseSuggestionService extends GeneralService {
    sendCourseSuggestion(courseSuggestion: CourseSuggestion) {
        /*
    		TODO: get username if it's authenticated and send to backend
    	*/

        console.log(courseSuggestion);
    }
}
