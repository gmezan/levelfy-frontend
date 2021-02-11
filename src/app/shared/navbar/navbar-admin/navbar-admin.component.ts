import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/security/auth.service';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent implements OnInit {

    @Input('auth-service') authService: AuthService;

    constructor() {}

    ngOnInit(): void {
    }

}
