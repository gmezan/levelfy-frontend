import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../../../../shared/_models/enrollment.model';

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.css'],
})
export class PaymentInfoComponent implements OnInit {
    @Input('enrollment') enrollment: Enrollment;

    constructor() {}

    ngOnInit(): void {}
}
