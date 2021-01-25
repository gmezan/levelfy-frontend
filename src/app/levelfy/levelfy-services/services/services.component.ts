import { Component, OnInit } from '@angular/core';
import { servicesTypes } from '../../../core/util/services-types';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
    services = servicesTypes;

    title = 'Servicios';

    constructor() {}

    ngOnInit(): void {}
}
