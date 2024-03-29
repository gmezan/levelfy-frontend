import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-custom-alert',
    templateUrl: './custom-alert.component.html',
    styleUrls: ['./custom-alert.component.css'],
})
export class CustomAlertComponent implements OnInit {
    @Input() isSuccess: boolean = true;
    @Input() message: string = '';

    public setValues(isSuccess: boolean, message: string) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    constructor() {}

    ngOnInit(): void {}
}
