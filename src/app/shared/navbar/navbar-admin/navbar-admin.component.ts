import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';
import { universitiesData } from '../../../core/util/universities.data';
import { AuthService } from '../../../core/security/auth.service';
import { Roles } from '../../../core/util/roles.data';

const params = {u: 'PUCP', r: 'ADMIN'}
const rolNum = [1,2,3,4];

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {
    services = servicesTypes;

    universities = universitiesData;

    params: any;

    rolStart = 'ADMIN';

    roles: string[];


    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {
        this.params = params;
        this.roles = Object.keys(Roles)
            .filter( (key) => !isNaN(Number(Roles[key])));
    }

    setUnivParam(u: string): void {
        this.params.u = u;
        console.log(params);
    }

    setRolParam(r: string): void {
        this.rolStart = r;
        this.params.r = Roles[r] + 1;
    }
}
