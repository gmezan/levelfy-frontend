import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../../core/util/services-types';
import { Service } from '../../../../shared/_models/service.model';
import { Course } from '../../../../shared/_models/course.model';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../../core/services/service.service';
import { CourseService } from '../../../../core/services/course.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { CourseId } from '../../../../shared/_dto/courseId.model';

@Component({
    selector: 'app-ases-paq',
    templateUrl: './ases-paq.component.html',
    styleUrls: ['./ases-paq.component.css'],
})
export class AsesPaqComponent implements OnInit {
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
            this.serviceService
                .findServiceByServiceTypeAndCourse_CourseId(
                    this.serviceType.key,
                    new CourseId(params.i, params.u)
                )
                .subscribe(
                    (data) => {
                        if (data == null || data.length === 0)
                            this.noServiceReturned(this.serviceType.route);

                        // List of services obtained
                        this.services = data;
                        this.course = data[0].course;
                        this.service = data[0];
                        console.log(this.services);
                    },
                    (error) => {}
                );
        });
    }

    onSelectedTeacher(value: string) {
        this.services.forEach((serv) => {
            if (serv.idService == ((value as unknown) as number))
                this.service = serv;
        });

        console.log(this.service);
    }

    fillModal(service: Service): FormGroup {
        // Validations must be according to the database
        this.service = service;

        let formSessionArray = [];
        this.service.serviceSessionList?.forEach((sl) =>
            formSessionArray.push(
                new FormGroup({
                    date: new FormControl(sl.date, Validators.required),
                    start: new FormControl(sl.start, Validators.required),
                    end: new FormControl(sl.end, Validators.required),
                })
            )
        );

        let formAgendaArray = [];
        this.service.serviceAgendaList?.forEach((sa) =>
            formAgendaArray.push(
                new FormGroup({
                    id: new FormControl(sa.id),
                    service: this.fb.group({
                        idService: [sa.service?.idService || 0],
                    }),
                    key: new FormControl(sa.key, Validators.required),
                    description: new FormControl(
                        sa.description,
                        Validators.required
                    ),
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
            serviceSessionList: new FormArray(formSessionArray),
            serviceAgendaList: new FormArray(formAgendaArray),
        });
    }

    noServiceReturned(serviceType: string) {
        console.log('No services available for this course and services type');
        this.router.navigate(['/services', serviceType]).then();
    }
}
