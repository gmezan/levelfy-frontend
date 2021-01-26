import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/_models/course.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { IdGetterModel } from '../../../shared/_dto/id-getter.model';

const modalStrings = {
    create: { title: 'Create Course', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Edit Course', submit: 'Save', cancel: 'Cancel' },
    delete: { title: 'Delete Course', submit: 'Delete', cancel: 'Cancel' },
};

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent
    extends ModalCrudComponent<Course>
    implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private elementRef: ElementRef,
        private fb: FormBuilder
    ) {
        super(courseService, modalStrings, new Course());
        this.form = this.fillModal();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Curso por universidad: ' + params.u || 'All';
            if (params.u) {
                this.courseService
                    .findCourseByCourseId_University(params.u)
                    .subscribe((data) => (this.resources = data));
            } else {
                // No params, list all
                this.courseService
                    .getAll()
                    .subscribe((data) => (this.resources = data));
            }
        });
    }

    submitModalForm() {
        if (!this.form.valid) {
            alert('Invalid submit');
        }

        // Using Pessimistic update
        let form = this.form.value;
        let id: string = form.courseId.idCourse.concat(
            '/',
            form.courseId.university
        );
        let index: number = this.resources.indexOf(
            this.resources.filter((r) => this.getId(r) === id)[0]
        );

        if (this.modal.isDelete) {
            this.dataService.delete(id).subscribe(
                (data) => {
                    this.resources.splice(index, 1);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else if (this.modal.isCreate) {
            let originalLength = this.resources.length;
            this.dataService.create(form).subscribe(
                (data) => {
                    this.resources.splice(originalLength - 1, 0, data);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else if (this.modal.isEdit) {
            let originalCourse = this.resources[index];
            this.dataService.update(form).subscribe(
                (data) => {
                    data.created = originalCourse.created;
                    this.resources.splice(index, 1, data);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
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

    // Methods for the search bar:
    keyupEnterSearchBar($event) {
        this.elementRef.nativeElement
            .querySelectorAll('.courseName')
            .forEach((el) => {
                el.parentElement.hidden =
                    $event.target.value &&
                    !CoursesComponent.refactorString(el.innerHTML)
                        .toString()
                        .includes(
                            CoursesComponent.refactorString($event.target.value)
                        );
            });

        $event.preventDefault();
    }

    private static refactorString(value: string): string {
        return value
            .toLowerCase()
            .split('á')
            .join('a')
            .split('é')
            .join('e')
            .split('í')
            .join('i')
            .split('ó')
            .join('o')
            .split('ú')
            .join('u');
    }
}
