import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { AuthService } from '../../../core/security/auth.service';

@Component({
    selector: 'app-navbar-client',
    templateUrl: './navbar-client.component.html',
    styleUrls: ['./navbar-client.component.css'],
})
export class NavbarClientComponent implements OnInit {
    services = servicesTypes;
    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {}
}
