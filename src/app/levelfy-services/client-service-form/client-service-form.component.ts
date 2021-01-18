import { Component, OnInit } from '@angular/core';
import {
    servicesTypes,
    servicesTypesDict,
} from '../../levelfy/utils/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../core/service/course.service';
import { ServiceService } from '../../core/service/service.service';
import { CourseId } from '../../shared/_dto/courseId.model';
import { Service } from '../../shared/_models/service.model';
import { Course } from '../../shared/_models/course.model';

@Component({
    selector: 'app-client-service-form',
    templateUrl: './client-service-form.component.html',
    styleUrls: ['./client-service-form.component.css'],
})
export class ClientServiceFormComponent implements OnInit {
    private sub: any;
    service: typeof servicesTypes[0];
    services: Service[];
    course: Course;

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            this.service = servicesTypesDict[params['type']];
            if (!this.service) {
                // verify service TYPE exists
                this.error();
                return;
            }
            this.route.queryParams.subscribe((params) => {
                // verify params courseId & university have been given
                if (!params.i || !params.u) return;

                /*
              		TODO: validate that the user (if authenticated) is not already registered in this service
                	If so, redirect to the page of validation & payment.
                 */

                // Get list of services that have the CourseID and the serviceType
                this.serviceService
                    .findServiceByServiceTypeAndCourse_CourseId(
                        this.service.key,
                        new CourseId(params.i, params.u)
                    )
                    .subscribe((data) => {
                        if (data == null || data.length === 0)
                            this.noServiceReturn(this.service.route);

                        // List of services obtained
                        this.services = data;
                        this.course = data[0].course;
                    });
            });
        });
    }

    error() {
        this.router.navigate(['/error']);
    }

    noServiceReturn(serviceType: string) {
        console.log('No services available for this course and service type');
        this.router.navigate(['/service', serviceType]);
    }
}
