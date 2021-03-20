import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { servicesTypes } from '../../../core/util/services-types';
import { Router } from '@angular/router';

const path = '#/c/courses';

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

    constructor(protected router: Router, @Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putFixedNavbarDark();

        this.servicesSelector = [];
        this.services.forEach((s) => {
            this.servicesSelector.push(s.key);
        });
    }

    onOptionsSelected(value: string) {
        let queryParams = value != 'All' ? { u: value } : null;
        console.log(value);
        this.router.navigate([path], { queryParams: queryParams });
    }
}
