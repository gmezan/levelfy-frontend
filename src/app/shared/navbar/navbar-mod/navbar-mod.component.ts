import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { AuthService } from '../../../core/security/auth.service';

@Component({
    selector: 'app-navbar-mod',
    templateUrl: './navbar-mod.component.html',
    styleUrls: ['./navbar-mod.component.css'],
})
export class NavbarModComponent implements OnInit {
    services = servicesTypes;
    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {}
}
