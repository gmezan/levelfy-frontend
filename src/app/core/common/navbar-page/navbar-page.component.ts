import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-navbar-page',
    templateUrl: './navbar-page.component.html',
    styleUrls: ['./navbar-page.component.css'],
})
export abstract class NavbarPageComponent implements OnInit {
    protected constructor(protected document: any) {}

    ngOnInit(): void {}

    private getNavbar(): HTMLElement {
        return this.document.getElementById('pageNavbar');
    }

    protected putFixedNavbarDark(): void {
        let navbar = this.getNavbar();
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('bg-transparent');
        navbar.classList.add('fixed-top');
    }

    protected putFixedNavbarLight(): void {
        let navbar = this.getNavbar();
        navbar.classList.add('navbar-light');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('bg-transparent');
        navbar.classList.add('fixed-top');
    }

    protected putNoHeaderNavbarDark(): void {
        let navbar = this.getNavbar();
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-dark');
        navbar.classList.remove('fixed-top');
    }
}
