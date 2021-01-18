import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../_models/course.model';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
    @Input('course') course: Course;
    @Input('footer-message') footerMessage: string;
    @Input('path-url') pathUrl;
    @Input('path-url-params') pathUrlParams;

    constructor() {}

    ngOnInit(): void {}
}
