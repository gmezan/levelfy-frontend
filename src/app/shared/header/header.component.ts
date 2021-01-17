import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    constructor() {}

    @Input('header-title') title: string;
    @Input('bg-image') bgImage: string;

    ngOnInit(): void {}
}
