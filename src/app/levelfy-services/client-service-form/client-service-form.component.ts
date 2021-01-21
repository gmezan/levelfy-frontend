import { Component, OnInit } from '@angular/core';
import {
    servicesTypes,
    mapServiceRoute2ServiceType,
} from '../../levelfy/utils/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../core/service/service.service';
import { CourseId } from '../../shared/_dto/courseId.model';
import { Service } from '../../shared/_models/service.model';
import { Course } from '../../shared/_models/course.model';

/*
	This component manages the inscription form of every service
 */

@Component({
    selector: 'app-client-service-form',
    templateUrl: './client-service-form.component.html',
    styleUrls: ['./client-service-form.component.css'],
})
export class ClientServiceFormComponent implements OnInit {
    private sub: any;
    serviceType: typeof servicesTypes[0];
    services: Service[] = [new Service()];
    course: Course = new Course();

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            this.serviceType = mapServiceRoute2ServiceType[params['type']];
            if (!this.serviceType) {
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
                        this.serviceType.key,
                        new CourseId(params.i, params.u)
                    )
                    .subscribe((data) => {
                        if (data == null || data.length === 0)
                            this.noServiceReturn(this.serviceType.route);

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
