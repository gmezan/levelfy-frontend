import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../../shared/_models/course.model';
import { CourseId } from '../../../../shared/_dto/courseId.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../../core/services/service.service';
import { Service } from '../../../../shared/_models/service.model';
import { servicesTypes } from '../../../../core/util/services-types';
import { CourseService } from 'app/core/services/course.service';
import { EnrollmentService } from 'app/core/services/enrollment.service';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { OpenClientService } from '../../../../core/services/open-client.service';

@Component({
    selector: 'app-ases-per',
    templateUrl: './ases-per.component.html',
    styleUrls: ['./ases-per.component.css'],
})
export class AsesPerComponent implements OnInit {
    @Input('message-for-the-button') messageForTheButton;
    @Input('service-type') serviceType: typeof servicesTypes[0];
    services: Service[] = [new Service()];
    course: Course = new Course();
    service: Service = new Service();
    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private courseService: CourseService,
        private openClientService: OpenClientService,
        private fb: FormBuilder,
        private enrollmentService: EnrollmentService,
        private router: Router
    ) {
        this.form = this.fillModal(this.service);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            // verify params courseId & university have been given
            if (!params.i || !params.u) return;

            /*
			  TODO: validate that the user (if authenticated) is not already registered in this services
			    If so, redirect to the page of validation & payment.
		     */

            // Get list of services that have the CourseID and the serviceType
            this.openClientService
                .getServiceFormByServiceTypeAndCourse_CourseId(
                    this.serviceType.key,
                    new CourseId(params.i, params.u)
                )
                .subscribe(
                    (data) => {
                        if (data == null || data.length === 0)
                            this.noServiceReturn(this.serviceType.route);

                        // List of services obtained
                        this.services = data;
                        this.course = data[0].course;
                        this.service = data[0];
                    },
                    (error) => {}
                );
        });
    }

    fillModal(service: Service): FormGroup {
        // Validations must be according to the database
        this.service = service;

        let formArray = [];
        this.service.serviceSessionList?.forEach((sl) =>
            formArray.push(
                new FormGroup({
                    date: new FormControl(sl.date, Validators.required),
                    start: new FormControl(sl.start, Validators.required),
                    end: new FormControl(sl.end, Validators.required),
                })
            )
        );

        return this.fb.group({
            idService: [this.service.idService],
            course: this.fb.group({
                courseId: this.fb.group({
                    idCourse: [
                        this.service.course.courseId.idCourse,
                        Validators.required,
                    ],
                    university: [
                        this.service.course.courseId.university,
                        Validators.required,
                    ],
                }),
            }),
            teacher: this.fb.group({
                idUser: [this.service.teacher.idUser, Validators.required],
            }),
            available: [this.service.available, Validators.required],
            serviceType: [this.service.serviceType, Validators.required],
            price: [this.service.price, Validators.required],
            evaluation: [this.service.evaluation],
            description: [this.service.description],
            expiration: [this.service.expiration],
            archived: [this.service.archived],
            photo: [this.service.photo],
            serviceSessionList: new FormArray(formArray),
        });
    }

    noServiceReturn(serviceType: string) {
        console.log('No services available for this course and services type');
        this.router.navigate(['/services', serviceType]).then();
    }
}
