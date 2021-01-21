import { Component, OnInit } from '@angular/core';
import { CourseSuggestionService } from '../../core/service/course-suggestion.service';
import { CourseSuggestion } from '../../shared/_models/course-suggestion.model';

/*
	The course suggestion section at the end of every service page
 */

@Component({
    selector: 'app-course-suggestion',
    templateUrl: './course-suggestion.component.html',
    styleUrls: ['./course-suggestion.component.scss'],
})
export class CourseSuggestionComponent implements OnInit {
    constructor(private courseSuggestionService: CourseSuggestionService) {}

    value: string = '';

    sendSuggestion() {
        if (!this.value) return;
        let courseSuggestion = new CourseSuggestion();
        courseSuggestion.name = this.value;
        this.courseSuggestionService.sendCourseSuggestion(courseSuggestion);
        this.value = '';
    }

    ngOnInit(): void {}
}
