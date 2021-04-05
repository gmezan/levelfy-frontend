import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../../../shared/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../../core/services/service.service';
import { Service } from '../../../../shared/_models/service.model';
import { servicesTypes } from '../../../../core/util/services-types';
import { CourseService } from 'app/core/services/course.service';
import { EnrollmentService } from 'app/core/services/enrollment.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { OpenClientService } from '../../../../core/services/open-client.service';
import { Enrollment } from '../../../../shared/_models/enrollment.model';

@Component({
    selector: 'app-ases-per',
    templateUrl: './ases-per.component.html',
    styleUrls: ['./ases-per.component.css'],
})
export class AsesPerComponent implements OnInit {
    @Input('message-for-the-button') messageForTheButton;
    @Input('service-type') serviceType: typeof servicesTypes[0];

    @Output('inscription-event')
    inscriptionEvent = new EventEmitter<Enrollment>();

    services: Service[] = [new Service()];
    course: Course = new Course();
    service: Service = new Service();
    form: FormGroup;

    // For the form:
    numberOfStudents: FormControl = new FormControl(1, [Validators.required]);
    endTime: FormControl = new FormControl(1, [Validators.required]);
    startTime: FormControl = new FormControl(null, [Validators.required]);
    dateAses: FormControl = new FormControl(null, [Validators.required]);

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
            if (!params.t) {
                this.router.navigate(['/services']);
                return;
            }

            let teachId = params.t;
            /*
			  TODO: validate that the user (if authenticated) is not already registered in this services
			    If so, redirect to the page of validation & payment.
		     */

            // Get list of services that have the CourseID and the serviceType
            this.openClientService
                .getServiceFormByServiceTypeAndTeacher(
                    this.serviceType.key,
                    teachId
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
        });
    }

    noServiceReturn(serviceType: string) {
        console.log('No services available for this course and services type');
        this.router.navigate(['/services', serviceType]).then();
    }

    emitInscription(): void {
        let enrollment: Enrollment = new Enrollment();
        enrollment.service = this.service;
        enrollment.numberOfStudents = this.numberOfStudents.value;

        enrollment.start = this.dateAses.value + 'T' + this.startTime.value;
        enrollment.end = this.dateAses.value + 'T' + this.endTime.value;

        this.inscriptionEvent.emit(enrollment);
    }

    onCourseChange(value: string) {
        this.services.forEach((serv) => {
            if (serv.course.courseId.idCourse == value) {
                this.service = serv;
            }
        });
    }
}
