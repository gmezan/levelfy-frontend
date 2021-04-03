import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { UserService } from '../../core/services/user.service';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-us',
    templateUrl: './us.component.html',
    styleUrls: ['./us.component.css'],
})
export class UsComponent extends NavbarPageComponent implements OnInit {
    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();
    }
}
