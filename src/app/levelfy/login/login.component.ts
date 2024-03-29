import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthService,
    SocialUser,
} from 'angularx-social-login';
import { OauthService } from '../../core/security/oauth.service';
import { TokenService } from '../../core/security/token.service';
import { TokenDto } from '../../shared/_models/token-dto.model';
import { UserService } from '../../core/services/user.service';
import { DOCUMENT } from '@angular/common';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { User } from '../../shared/_models/user.model';

/*
    This component should only manage the FB & Google Login
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent extends NavbarPageComponent implements OnInit {
    constructor(
        private socialAuthService: SocialAuthService,
        private router: Router,
        private oauthService: OauthService,
        private tokenService: TokenService,
        private userService: UserService,
        @Inject(DOCUMENT) document: any
    ) {
        super(document);
    }

    socialUser: SocialUser;

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();

        this.socialAuthService.authState.subscribe((data) => {});
    }

    signInWithGoogle(): void {
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((data) => {
                this.socialUser = data;

                const tokenGoogle = new TokenDto(this.socialUser.idToken);
                this.oauthService.google(tokenGoogle).subscribe(
                    (res) => {
                        this.tokenService.setToken(res.value);
                        // Getting current user:
                        this.userService.getCurrent().subscribe(
                            (res) => {
                                this.tokenService.setUser(res);
                                this.router
                                    .navigate([this.redirectByRole()])
                                    .then();
                            },
                            (error) => {
                                console.log(error);
                                this.tokenService.logOut();
                            }
                        );
                    },
                    (error) => {
                        console.log(error);
                        this.tokenService.logOut();
                    }
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    isUserRegistrationCompleted(user: User): boolean {
        if (!user.phone || user.phone === 0) return false;
        if (!user.name || user.name === '') return false;
        if (!user.university || user.university === '') return false;
        if (!user.birthday || user.birthday === '') return false;
        return !(!user.gender || user.gender === '');
    }

    /*
        TODO: fix facebook sign in like google
     */

    signInWithFB(): void {
        this.socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then((data) => {
                this.socialUser = data;
                const tokenFB = new TokenDto(this.socialUser.authToken);

                this.oauthService.facebook(tokenFB).subscribe(
                    (res) => {
                        this.tokenService.setToken(res.value);
                        this.router.navigate(['/']).then();
                    },
                    (error) => {
                        console.log(error);
                        this.tokenService.logOut();
                    }
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    private redirectByRole(): string {
        let route;
        let user = this.tokenService.getUser();
        switch (user.role[0].idRole) {
            case 1:
                if (!this.isUserRegistrationCompleted(user))
                    route = 'c/registration';
                else route = 'c';

                break;
            case 2:
                route = 't';
                break;
            case 3:
                route = 'm';
                break;
            case 4:
                route = 'a';
                break;
            default:
                route = 'home';
        }
        return route;
    }
}

/*

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

*/
