import { Injectable } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

const TOKEN_KEY = 'AuthToken';
const CURRENT_USER_KEY = 'User';

/*
    localStorage Authentication
 */

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor(
        private router: Router,
        private socialAuthService: SocialAuthService
    ) {}

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getUser(): User {
        let json: string = localStorage.getItem(CURRENT_USER_KEY);
        if (json) {
            return JSON.parse(json);
        }
        return null;
    }

    public setUser(res: User) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res));
    }

    logOut(): void {
        this.socialAuthService
            .signOut()
            .then((data) => {
                localStorage.clear();
                this.router.navigate(['login']).then();
            })
            .catch((err) => {
                localStorage.clear();
                this.router.navigate(['login']).then();
            });
    }
}
