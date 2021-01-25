import { Component, Input, OnInit } from '@angular/core';
import {
    servicesTypes,
    mapServiceRoute2ServiceType,
} from '../../utils/services-types';
import { Course } from '../../../shared/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';

/*
	This component LISTS the courses available for each services
 */

@Component({
    selector: 'app-general-service',
    templateUrl: './general-service.component.html',
    styleUrls: ['./general-service.component.css'],
})
export class GeneralServiceComponent implements OnInit {
    // for the CourseCard
    courses: Course[];
    footerMessage: string = 'Ver detalles';

    private sub: any;
    service: typeof servicesTypes[0];
    noCourses: boolean = false;

    // injecting dependencies
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Listing courses according to the serviceType:
        this.sub = this.route.params.subscribe((params) => {
            this.service = mapServiceRoute2ServiceType[params['type']];
            if (!this.service) {
                this.error();
                return;
            }
            this.courseService
                .getAvailableCoursesByService(this.service.key)
                .subscribe(
                    (data) => {
                        this.courses = data;
                        this.noCourses = data == null || data.length === 0;
                    },
                    (error: Response) => {
                        console.log(error);
                    }
                );
        });
    }

    error() {
        this.router.navigate(['/error']);
    }
}
