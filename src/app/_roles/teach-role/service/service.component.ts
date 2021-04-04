import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    mapServiceRoute2ServiceType,
    servicesTypes,
} from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../shared/_models/service.model';
import { Enrollment } from '../../../shared/_models/enrollment.model';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { ForumDirective } from '../../../shared/forum/forum.directive';
import { ForumComponent } from '../../../shared/forum/forum.component';
import { RoleTeachService } from '../../../core/services/role-teach.service';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css'],
})
export class ServiceComponent extends NavbarPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router,
        private enrollmentService: EnrollmentService,
        private serviceService: ServiceService,
        private roleTeachService: RoleTeachService,
        @Inject(DOCUMENT) document: any,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(document);
    }

    @ViewChild(ForumDirective, { static: true })
    forumDirective: ForumDirective;

    form: FormGroup;

    service: Service = new Service();
    enrollmentList: Enrollment[];
    serviceType: typeof servicesTypes[0];

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();

        this.route.params.subscribe((params) => {
            let id: number = parseInt(params['id']);
            if (!id) {
                this.router.navigate(['/t/services']);
                return;
            }
            this.serviceService.get(id.toString()).subscribe(
                (data) => {
                    this.service = data;
                    this.roleTeachService
                        .getEnrollmentList(data)
                        .subscribe((enrollmentList) => {
                            this.service.enrollmentList = enrollmentList;
                        });
                    this.loadForum(data);
                    this.serviceType =
                        mapServiceRoute2ServiceType[
                            this.service.serviceType
                                .toLowerCase()
                                .replace('_', '-')
                        ];
                },
                (error) => {
                    this.router.navigate(['/t/services']);
                    return;
                }
            );
        });
    }

    protected loadForum(service: Service) {
        const viewContainerRef = this.forumDirective.viewContainerRef;
        viewContainerRef.clear();

        viewContainerRef.createComponent<ForumComponent>(
            this.componentFactoryResolver.resolveComponentFactory(
                ForumComponent
            )
        ).instance.service = service;
    }

    error() {
        this.router.navigate(['/error']).then();
    }
}
