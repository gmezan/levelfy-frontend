import { Component, Inject, OnInit } from '@angular/core';
import {
    servicesTypes,
    mapServiceRoute2ServiceType,
} from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { CourseId } from '../../../shared/_dto/courseId.model';
import { Service } from '../../../shared/_models/service.model';
import { Course } from '../../../shared/_models/course.model';
import { DOCUMENT } from '@angular/common';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';

/*
	This component manages the inscription form of every services
 */

@Component({
    selector: 'app-client-service-form',
    templateUrl: './client-service-form.component.html',
    styleUrls: ['./client-service-form.component.css'],
})
export class ClientServiceFormComponent
    extends NavbarPageComponent
    implements OnInit {
    serviceType: typeof servicesTypes[0];
    course: Course = new Course();

    messageForTheButton = 'La mejor asesoría a un click de distancia';
    servicesTypes = servicesTypes;

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router,
        @Inject(DOCUMENT) document: any
    ) {
        super(document);
    }

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();

        this.route.params.subscribe((params) => {
            let serviceType = params.type;
            this.serviceType = mapServiceRoute2ServiceType[serviceType];
            if (!this.serviceType) {
                // verify services TYPE exists
                this.error();
                return;
            }
        });
    }

    error() {
        this.router.navigate(['/error']).then();
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
