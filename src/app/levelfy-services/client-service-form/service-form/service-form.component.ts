import { Component, Input, OnInit } from '@angular/core';
import { servicesTypes } from '../../../levelfy/utils/services-types';

/*
	This component just manage the <form></fom> tag of the client-services-form component
	It changes according of the type of services
 */

@Component({
    selector: 'app-service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
    messageForTheButton = 'La mejor asesoría a un click de distancia';
    /*
    	Load the servicesTypes Object
     */
    servicesTypes = servicesTypes;
    @Input('services-type') serviceType: typeof servicesTypes[0];

    constructor() {}

    ngOnInit(): void {}
}
