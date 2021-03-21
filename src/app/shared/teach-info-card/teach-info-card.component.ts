import { Component, Input, OnInit } from '@angular/core';
import { TeacherCoursesInfo } from '../_dto/teacher-courses-info.model';

@Component({
    selector: 'app-teach-info-card',
    templateUrl: './teach-info-card.component.html',
    styleUrls: ['./teach-info-card.component.css'],
})
export class TeachInfoCardComponent implements OnInit {
    @Input('teacher-courses-info') teacherCoursesInfo: TeacherCoursesInfo;
    @Input('path-url') pathUrl;
    @Input('footer-message') footerMessage: string;

    pathUrlParams;

    constructor() {}

    ngOnInit(): void {
        this.pathUrlParams = { t: this.teacherCoursesInfo.userId };
    }
}
