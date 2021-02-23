import { Component, OnInit } from '@angular/core';
import { mapServiceRoute2ServiceType } from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../shared/_models/service.model';
import { Enrollment } from '../../../shared/_models/enrollment.model';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
    private sub: any;
    private service: Service;
    private enrollmentList: Enrollment[];
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router,
        private enrollmentService: EnrollmentService,
        private serviceService: ServiceService
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe((params) => {
            let id: number = parseInt(params['id']);
            if (!id) {
                this.router.navigate(['/t/services']);
                return;
            }
            this.serviceService.get(id.toString()).subscribe(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    this.router.navigate(['/t/services']);
                    return;
                }
            );
        });
    }
}
