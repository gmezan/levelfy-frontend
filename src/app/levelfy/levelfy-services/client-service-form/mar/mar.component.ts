import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-mar',
    templateUrl: './mar.component.html',
    styleUrls: ['./mar.component.css'],
})
export class MarComponent implements OnInit {
    @Input() messageForTheButton;

    constructor() {}

    ngOnInit(): void {}
}
