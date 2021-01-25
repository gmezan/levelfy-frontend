import { Component, OnInit } from '@angular/core';
import { servicesTypes } from '../../core/util/services-types';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    test: Date = new Date();

    services = servicesTypes;

    constructor() {}

    ngOnInit() {}
}
