import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent extends NavbarPageComponent implements OnInit {
    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putFixedNavbarLight();
    }
}
