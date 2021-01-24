import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/common/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    signIn(credentials): void {
        this.authService.login(credentials);

        let route;
        switch (parseInt(this.authService.currentUser.role.idRole)){
            case 1:
                route = 'c'
                break;
            case 2:
                route = 't'
                break;
            case 3:
                route = 'm'
                break;
            case 4:
                route = 'a'
                break;
            default:
                route = 'home'
        }
        console.log(route);
        this.router.navigate([route]);

    }

    ngOnInit(): void {}
}
