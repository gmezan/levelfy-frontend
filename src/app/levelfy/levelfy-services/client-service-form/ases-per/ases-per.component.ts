import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ases-per',
    templateUrl: './ases-per.component.html',
    styleUrls: ['./ases-per.component.css'],
})
export class AsesPerComponent implements OnInit {
    @Input() messageForTheButton;

    constructor() {}

    ngOnInit(): void {}
}
