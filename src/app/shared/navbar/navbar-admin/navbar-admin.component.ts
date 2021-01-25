import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { universitiesData } from '../../../core/util/universities.data';
import { AuthService } from '../../../core/security/auth.service';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {
    services = servicesTypes;

    universities = universitiesData;

    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {}
}
