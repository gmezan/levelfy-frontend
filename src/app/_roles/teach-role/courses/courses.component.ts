import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Course } from '../../../shared/_models/course.model';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';

const path = '/t/courses';

const modalStrings = {
    create: { title: 'Create Course', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Edit Course', submit: 'Save', cancel: 'Cancel' },
    delete: { title: 'Delete Course', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
    create: {
        success: 'Course created successfully',
        error: 'There was an error creating this course, try again later',
    },
    edit: {
        success: 'Course edited successfully',
        error: 'There was an error updating this course, try again later',
    },
    delete: {
        success: 'Course deleted correctly',
        error: 'There was an error deleting this course, try again later',
    },
    image: {
        success: 'Image uploaded correctly',
        error: 'There was an error uploading the image, try again later',
    },
};

const searchBarSelector = '.courseName';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent
    extends ModalCrudComponent<Course>
    implements OnInit {
    universitiesSelector: string[];

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private courseService: CourseService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(
            courseService,
            '*',
            new Course(),
            searchBarSelector,
            elementRef,
            router,
            path
        );
        this.form = this.fillModal();
        this.universitiesSelector = [];
        this.universities.forEach((u) => {
            this.universitiesSelector.push(u);
        });
        this.universitiesSelector.splice(0, 0, 'All');
    }

    ngOnInit(): void {
        // For multiple Courses
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Curso por universidad: ';
            let queryParams = params.u ? { u: params.u } : null;
            this.courseService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.updateResourcesSliced();
            });
        });
    }

    fillModal() {
        // Validations must be according to the database
        return this.fb.group({
            courseId: this.fb.group({
                idCourse: [
                    this.resource.courseId.idCourse,
                    Validators.required,
                ],
                university: [
                    this.resource.courseId.university,
                    Validators.required,
                ],
            }),
            name: [this.resource.name, Validators.required],
            cycle: [
                this.resource.cycle,
                [Validators.min(1), Validators.max(10), Validators.required],
            ],
            photo: [this.resource.photo],
            description: [this.resource.description],
        });
    }

    getId(course: Course): string {
        return course.courseId.idCourse.concat('/', course.courseId.university);
    }

    onSubmitModalForm(resource, index, id) {}

    protected createAlert(isSuccess: boolean, message: string) {}

    onOptionsSelected(value: string) {
        let queryParams = value != 'All' ? { u: value } : null;
        console.log(value);
        this.router.navigate([path], { queryParams: queryParams });
    }
}
