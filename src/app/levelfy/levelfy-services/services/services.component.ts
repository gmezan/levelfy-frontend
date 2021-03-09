import { Component, Inject, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { DOCUMENT } from '@angular/common';
import { NavbarPageComponent } from '../../../core/common/navbar-page/navbar-page.component';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
})
export class ServicesComponent extends NavbarPageComponent implements OnInit {
    services = servicesTypes;

    title = 'Servicios';

    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putFixedNavbarDark();
    }
}
