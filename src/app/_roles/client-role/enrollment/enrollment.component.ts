import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import {
    mapServiceRoute2ServiceType,
    servicesTypes,
} from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { RoleClientService } from '../../../core/services/role-client.service';
import { Enrollment } from '../../../shared/_models/enrollment.model';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.css'],
})
export class EnrollmentComponent extends NavbarPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router,
        private roleClientService: RoleClientService,
        @Inject(DOCUMENT) document: any
    ) {
        super(document);
        this.enrollment = new Enrollment();
    }

    enrollment: Enrollment;
    serviceType: typeof servicesTypes[0];

    messageForTheButton = '¡Ya estás inscrito!';

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();

        this.route.params.subscribe((params) => {
            let id = params.id;

            if (!id) {
                // verify services TYPE exists
                this.error();
                return;
            }

            this.roleClientService.getEnrollment(id).subscribe(
                (data) => {
                    this.enrollment = data;
                    this.serviceType =
                        mapServiceRoute2ServiceType[
                            this.enrollment.service.serviceType
                                .toLowerCase()
                                .replace('_', '-')
                        ];
                },
                (error1) => {
                    console.log(error1);
                }
            );
        });
    }

    error() {
        this.router.navigate(['/error']).then();
    }
}
