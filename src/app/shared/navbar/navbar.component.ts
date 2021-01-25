import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { servicesTypes } from '../../core/util/services-types';
import { AuthService } from '../../core/security/auth.service';
import { universitiesData } from '../../core/util/universities.data';

const baseTitle = 'LEVELFY';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    services = servicesTypes;

    universities = universitiesData;

    constructor(public authService: AuthService) {}

    ngOnInit() {}
}
