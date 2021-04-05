import { Component, Inject, Input, OnInit } from '@angular/core';
import {
    servicesTypes,
    mapServiceRoute2ServiceType,
} from '../../../core/util/services-types';
import { Course } from '../../../shared/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { DOCUMENT } from '@angular/common';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { OpenClientService } from '../../../core/services/open-client.service';
import { TeacherCoursesInfo } from '../../../shared/_dto/teacher-courses-info.model';
import { FormControl } from '@angular/forms';

/*
	This component LISTS the courses available for each services
 */

const path = '/services';

@Component({
    selector: 'app-general-service',
    templateUrl: './general-service.component.html',
    styleUrls: ['./general-service.component.css'],
})
export class GeneralServiceComponent
    extends NavbarPageComponent
    implements OnInit {
    // for the CourseCard
    courses: Course[];
    teacherCoursesInfo: TeacherCoursesInfo[];
    footerMessage: string = 'Ver detalles';

    serviceType: typeof servicesTypes[0];
    noCourses: boolean = false;
    university: FormControl = new FormControl('NONE');

    // injecting dependencies
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private openClientService: OpenClientService,
        private router: Router,
        @Inject(DOCUMENT) document: any
    ) {
        super(document);
    }

    ngOnInit(): void {
        this.putFixedNavbarDark();

        // Listing courses according to the serviceType:
        this.route.params.subscribe((params) => {
            this.serviceType = mapServiceRoute2ServiceType[params['type']];
            if (!this.serviceType) {
                this.error();
                return;
            }

            this.route.queryParams.subscribe((queryParams) => {
                let university = queryParams.u || 'NONE';
                this.university.setValue(university);

                switch (this.serviceType.key) {
                    case 'ASES_PER':
                        this.openClientService
                            .getAvailableServiceByTeacher(
                                this.serviceType.key,
                                university
                            )
                            .subscribe(
                                (data) => {
                                    this.teacherCoursesInfo = data;
                                    this.courses = [];
                                    this.noCourses =
                                        data == null || data.length === 0;
                                },
                                (error: Response) => {
                                    console.log(error);
                                }
                            );
                        break;

                    case 'ASES_PAQ':
                        this.openClientService
                            .getAvailableServiceByCourse(
                                this.serviceType.key,
                                university
                            )
                            .subscribe(
                                (data) => {
                                    this.courses = data;
                                    this.teacherCoursesInfo = [];
                                    this.noCourses =
                                        data == null || data.length === 0;
                                },
                                (error: Response) => {
                                    console.log(error);
                                }
                            );
                        break;
                    case 'MAR':
                        this.openClientService
                            .getAvailableServiceByCourse(
                                this.serviceType.key,
                                university
                            )
                            .subscribe(
                                (data) => {
                                    this.courses = data;
                                    this.teacherCoursesInfo = [];
                                    this.noCourses =
                                        data == null || data.length === 0;
                                },
                                (error: Response) => {
                                    console.log(error);
                                }
                            );
                        break;
                }
            });
        });
    }

    error() {
        this.router.navigate(['/error']);
    }

    onOptionsSelected(university: string) {
        if (university === 'NONE') {
            university = null;
        }
        let queryParams = { u: university };
        this.router.navigate([path + '/' + this.serviceType.route], {
            queryParams: queryParams,
        });
    }
}
