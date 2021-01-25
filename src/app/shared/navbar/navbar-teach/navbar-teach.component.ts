import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { AuthService } from '../../../core/security/auth.service';

@Component({
    selector: 'app-navbar-teach',
    templateUrl: './navbar-teach.component.html',
    styleUrls: ['./navbar-teach.component.css'],
})
export class NavbarTeachComponent implements OnInit {
    services = servicesTypes;
    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {}
}
