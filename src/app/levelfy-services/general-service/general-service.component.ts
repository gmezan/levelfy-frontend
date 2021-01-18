import { Component, Input, OnInit } from '@angular/core';
import {
    servicesTypes,
    servicesTypesDict,
} from '../../levelfy/utils/services-types';
import { Course } from '../../shared/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../core/service/course.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-general-service',
    templateUrl: './general-service.component.html',
    styleUrls: ['./general-service.component.css'],
})
export class GeneralServiceComponent implements OnInit {
    // for the CourseCard
    courses: Course[];
    footerMessage: string = 'Ver detalles';

    // to find the service type
    private sub: any;
    service: typeof servicesTypes[0];
    noCourses: boolean = false;

    // injecting dependencies
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router
    ) {}
    œ;
    ngOnInit(): void {
        // Listing courses according to the serviceType:
        this.sub = this.route.params.subscribe((params) => {
            this.service = servicesTypesDict[params['type']];
            if (!this.service) {
                this.error();
                return;
            }
            this.courseService
                .getAvailableCoursesByService(this.service.key)
                .subscribe((data) => {
                    this.courses = data;
                    this.noCourses = data == null || data.length === 0;
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    error() {
        this.router.navigate(['/error']);
    }
}
