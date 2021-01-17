import { Component, Input, OnInit } from '@angular/core';
import {
    servicesTypes,
    servicesTypesDict,
} from '../../levelfy/utils/services-types';
import { Course } from '../../shared/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../core/service/course.service';

@Component({
    selector: 'app-general-service',
    templateUrl: './general-service.component.html',
    styleUrls: ['./general-service.component.css'],
})
export class GeneralServiceComponent implements OnInit {
    courses: Course[];
    private sub: any;
    service: typeof servicesTypes[0];

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            this.service = servicesTypesDict[params['type']];
            !this.service && this.error();
            this.courseService
                .getAvailableCoursesByService(this.service.route)
                .subscribe((data) => (this.courses = data));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    error() {
        this.router.navigate(['/error']);
    }
}
