import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css'],
})
export class PrivacyPolicyComponent
    extends NavbarPageComponent
    implements OnInit {
    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();
    }
}
