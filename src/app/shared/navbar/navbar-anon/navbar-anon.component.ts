import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/security/auth.service';
import { servicesTypes } from '../../../core/util/services-types';

@Component({
    selector: 'app-navbar-anon',
    templateUrl: './navbar-anon.component.html',
    styleUrls: ['./navbar-anon.component.css'],
})
export class NavbarAnonComponent implements OnInit {
    services = servicesTypes;
    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {}
}
