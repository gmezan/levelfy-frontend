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
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './app-components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        @Inject(DOCUMENT) private document: any,
        private element: ElementRef,
        public location: Location
    ) {}
    ngOnInit() {
        let navbar: HTMLElement = this.element.nativeElement.children[0]
            .children[0];
        this._router = this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                if (window.outerWidth > 991) {
                    window.document.children[0].scrollTop = 0;
                } else {
                    window.document.activeElement.scrollTop = 0;
                }
                this.navbar.sidebarClose();
            });

        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;

            if (number > 150 || window.pageYOffset > 150) {
                // Remove transparent (make solid if the page is scrolled more than 150)
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // If is not scrolled that much, make the navbar transparent
                // remove logic
                !this.isNavbarInFormPage() &&
                    navbar.classList.add('navbar-transparent');
            }
        });
        let ua = window.navigator.userAgent;
        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            var version = parseInt(
                ua.substring(rv + 3, ua.indexOf('.', rv)),
                10
            );
        }
        if (version) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');
        }

        // Custom scroll to top when change route
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) return;
            window.scrollTo(0, 0);

            // Make the navbar transparent or solid
            if (this.isNavbarInFormPage()) {
                // stop making it transparent
                navbar.classList.remove('navbar-transparent');
                // make it stay on top of page
                navbar.classList.add('navbar-relative');
            } else {
                navbar.classList.add('navbar-transparent');
                navbar.classList.remove('navbar-relative');
            }
        });
    }

    removeFooter() {
        let title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice(1);
        return !(title === 'signup' || title === 'nucleoIcons');
    }

    isNavbarInFormPage(): boolean {
        let title = this.location.prepareExternalUrl(this.location.path());
        return title.includes('form');
    }
}
