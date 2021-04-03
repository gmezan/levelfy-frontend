import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-tyc',
    templateUrl: './tyc.component.html',
    styleUrls: ['./tyc.component.css'],
})
export class TycComponent extends NavbarPageComponent implements OnInit {
    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();
    }
}
