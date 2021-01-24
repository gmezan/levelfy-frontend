import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { servicesTypes } from '../../levelfy/utils/services-types';
import { AuthService } from '../../core/common/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    services = servicesTypes;

    constructor( public authService: AuthService) {
    }

    ngOnInit() {

    }

}
