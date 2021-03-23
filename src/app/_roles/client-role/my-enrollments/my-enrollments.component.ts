import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { servicesTypes } from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleClientService } from '../../../core/services/role-client.service';
import { Enrollment } from '../../../shared/_models/enrollment.model';

const path = '/c/enrollment';

@Component({
    selector: 'app-my-enrollments',
    templateUrl: './my-enrollments.component.html',
    styleUrls: ['./my-enrollments.component.css'],
})
export class MyEnrollmentsComponent
    extends NavbarPageComponent
    implements OnInit {
    title = 'Mis Cursos';
    services = servicesTypes;
    servicesSelector: string[];

    availableEnrollment: Enrollment[] = [];
    unavailableEnrollment: Enrollment[] = [];

    footerMessage: string = 'Ver inscripción';

    constructor(
        private route: ActivatedRoute,
        private roleClientService: RoleClientService,
        protected router: Router,
        @Inject(DOCUMENT) document: any
    ) {
        super(document);
    }

    ngOnInit(): void {
        this.putFixedNavbarDark();

        this.servicesSelector = [];
        this.services.forEach((s) => {
            this.servicesSelector.push(s.key);
        });
        this.servicesSelector.splice(0, 0, 'Todo');

        this.route.queryParams.subscribe((params) => {
            let enrollments: Enrollment[] = [];

            //console.log('Routing to: ', queryParams);
            this.roleClientService
                .getEnrollments(params.s)
                .subscribe((data) => {
                    enrollments = data;
                    this.availableEnrollment = [];
                    this.unavailableEnrollment = [];
                    enrollments.forEach((enrollment) => {
                        if (enrollment.active)
                            this.availableEnrollment.splice(0, 0, enrollment);
                        else
                            this.unavailableEnrollment.splice(0, 0, enrollment);
                    });
                });
        });
    }

    onOptionsSelected(value: string) {
        let queryParams = value != 'Todo' ? { s: value } : null;
        this.router.navigate([path], { queryParams: queryParams });
    }
}
