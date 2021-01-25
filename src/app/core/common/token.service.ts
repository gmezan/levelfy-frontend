import { Injectable } from '@angular/core';
import { User } from '../../shared/_models/user.model';

const TOKEN_KEY = 'AuthToken';
const CURRENT_USER_KEY = 'User';

/*
    localStorage Authentication
 */

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor() {}

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getUser(): User {
        let json = localStorage.getItem(CURRENT_USER_KEY);
        if (!json) {
            return JSON.parse(json);
        }
        return null;
    }

    public setUser(res: User) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res));
    }

    logOut(): void {
        localStorage.clear();
    }
}
