import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../../core/util/services-types';
import { Service } from '../../../../shared/_models/service.model';
import { Course } from '../../../../shared/_models/course.model';

@Component({
    selector: 'app-ases-paq',
    templateUrl: './ases-paq.component.html',
    styleUrls: ['./ases-paq.component.css'],
})
export class AsesPaqComponent implements OnInit {
    @Input('message-for-the-button') messageForTheButton;
    @Input('service-type') serviceType: typeof servicesTypes[0];
    services: Service[] = [new Service()];
    course: Course = new Course();

    constructor() {}

    ngOnInit(): void {}
}
