import { Component, OnInit } from '@angular/core';
import { CourseSuggestionService } from '../../../core/services/course-suggestion.service';
import { CourseSuggestion } from '../../../shared/_models/course-suggestion.model';
import { OpenClientService } from '../../../core/services/open-client.service';

/*
	The course suggestion section at the end of every services page
 */

@Component({
    selector: 'app-course-suggestion',
    templateUrl: './course-suggestion.component.html',
    styleUrls: ['./course-suggestion.component.scss'],
})
export class CourseSuggestionComponent implements OnInit {
    constructor(private openClientService: OpenClientService) {}

    value: string = '';

    sendSuggestion() {
        if (!this.value) return;
        let courseSuggestion = new CourseSuggestion();
        courseSuggestion.name = this.value;
        this.openClientService
            .sendSuggestion(courseSuggestion)
            .subscribe((data) => {
                console.log(data);
            });
        this.value = '';
    }

    ngOnInit(): void {}
}
