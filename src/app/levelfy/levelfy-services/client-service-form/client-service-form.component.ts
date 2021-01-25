import { Component, OnInit } from '@angular/core';
import {
    servicesTypes,
    mapServiceRoute2ServiceType,
} from '../../utils/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { CourseId } from '../../../shared/_dto/courseId.model';
import { Service } from '../../../shared/_models/service.model';
import { Course } from '../../../shared/_models/course.model';

/*
	This component manages the inscription form of every services
 */

@Component({
    selector: 'app-client-service-form',
    templateUrl: './client-service-form.component.html',
    styleUrls: ['./client-service-form.component.css'],
})
export class ClientServiceFormComponent implements OnInit {
    serviceType: typeof servicesTypes[0];
    services: Service[] = [new Service()];
    course: Course = new Course();

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.serviceType =
            mapServiceRoute2ServiceType[
                this.route.snapshot.paramMap.get('type')
            ];
        if (!this.serviceType) {
            // verify services TYPE exists
            this.error();
            return;
        }

        let params = {
            i: this.route.snapshot.queryParamMap.get('i'),
            u: this.route.snapshot.queryParamMap.get('u'),
        };

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
            .subscribe((data) => {
                if (data == null || data.length === 0)
                    this.noServiceReturn(this.serviceType.route);

                // List of services obtained
                this.services = data;
                this.course = data[0].course;
            });
    }

    error() {
        this.router.navigate(['/error']).then();
    }

    noServiceReturn(serviceType: string) {
        console.log('No services available for this course and services type');
        this.router.navigate(['/services', serviceType]).then();
    }
}

/*

this.route.params.subscribe((params)=>{});

this.route.queryParams.subscribe((params) => {
            // verify params courseId & university have been given
            if (!params.i || !params.u) return;

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

 */
