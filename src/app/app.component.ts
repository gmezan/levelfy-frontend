import {
    Component,
    OnInit,
    Inject,
    Renderer2,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './core/common/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    hideNavBar = false;

    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        @Inject(DOCUMENT) private document: any,
        private element: ElementRef,
        public location: Location,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        let navbar: HTMLElement = this.document.getElementById('pageNavbar');
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) return;
            window.scrollTo(0, 0); // Go to top after page change


            let pageHeader: HTMLElement = this.document.getElementById(
                'pageHeader'
            ); // Getting the pageHeader element

            /*
				DO NOT change the page header, the navbar should change
				dynamically according to the pageHeader style.
				
				Just change the NavBar styles.
			 */
            let navbar: HTMLElement = this.document.getElementById('pageNavbar');
            if (!navbar) {
                console.log("no navbar");
                return;
            }

            if (!pageHeader) {
                // Has no header
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
                navbar.classList.remove('bg-transparent');
                navbar.classList.add('bg-dark');
                navbar.classList.remove('fixed-top');
            } else if (pageHeader.classList.contains('page-header-dark')) {
                // Page header is dark
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
                navbar.classList.add('bg-transparent');
                navbar.classList.add('fixed-top');
            } else if (pageHeader.classList.contains('page-header-light')) {
                // Page header is light
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('bg-transparent');
                navbar.classList.add('fixed-top');
            }


        });
    }

}
