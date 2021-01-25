import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/_models/course.model';
import { Modal } from '../../../shared/_dto/modal.model';
import { CourseId } from '../../../shared/_dto/courseId.model';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
    selectedUniv: string;
    title: string = 'Curso por universidad: ';
    courses: Course[];

    courseModal: Course = new Course();
    modal = new Modal();

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        //let university = this.route.snapshot.paramMap.get('type');

        this.route.queryParams.subscribe((params) => {
            this.courses = [];
            this.selectedUniv = params.u || 'All';
            if (params.u) {
                this.courseService
                    .findCourseByCourseId_University(params.u)
                    .subscribe((data) => {
                        this.courses = data;
                    });
            } else {
                // No params, list all
                this.courseService.getAll().subscribe((data) => {
                    this.courses = data;
                });
            }
        });
    }

    modalEdit(courseId: CourseId) {
        this.modal.modalEdit('Edit Course', 'Save', 'Cancel');
        this.courseService
            .get(courseId.idCourse.concat('/', courseId.university))
            .subscribe(
                (data) => (this.courseModal = data),
                (error) => {
                    alert('Something wrong happened');
                }
            );
    }

    modalCreate() {
        this.courseModal = new Course();
        this.modal.modalCreate('Create Course', 'Create', 'Cancel');
    }

    modalDelete(courseId: CourseId) {
        this.modal.modalDelete('Delete Course', 'Delete', 'Cancel');
        this.courseService
            .get(courseId.idCourse.concat('/', courseId.university))
            .subscribe(
                (data) => (this.courseModal = data),
                (error) => {
                    alert('Something wrong happened');
                }
            );
    }

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
