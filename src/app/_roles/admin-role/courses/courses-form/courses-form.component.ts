import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from '../../../../shared/_models/course.model';
import { Modal } from '../../../../shared/_dto/modal.model';

@Component({
    selector: 'app-courses-form',
    templateUrl: './courses-form.component.html',
    styleUrls: ['./courses-form.component.css'],
})
export class CoursesFormComponent implements OnInit {
    @Input('modal') modal: Modal;
    @Input('course-modal') courseModal: Course;
    form;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}
}
