import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ases-paq',
    templateUrl: './ases-paq.component.html',
    styleUrls: ['./ases-paq.component.css'],
})
export class AsesPaqComponent implements OnInit {
    @Input() messageForTheButton;

    constructor() {}

    ngOnInit(): void {}
}
