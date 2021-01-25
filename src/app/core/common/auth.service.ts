import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data-service.service';
import { User } from '../../shared/_models/user.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        http: HttpClient,
        private router: Router,
        private tokenService: TokenService
    ) {
        // AuthController
    }

    logout(): void {
        this.tokenService.logOut();
    }

    isLoggedIn(): boolean {
        let user = this.getCurrentUser();
        return user != null;
    }

    getCurrentUser(): any {
        return this.tokenService.getUser();
    }

    /*
        Users can Fool this validation,
        but when consuming API REST, the backend always verify the user authenticity.
     */

    isAdmin(): boolean {
        let user = this.getCurrentUser();
        if (!user) return false;
        return user.role[0].idRole === 4;
    }

    isMod(): boolean {
        let user = this.getCurrentUser();
        if (!user) return false;
        return user.role[0].idRole === 3;
    }

    isTeach(): boolean {
        let user = this.getCurrentUser();
        if (!user) return false;
        return user.role[0].idRole === 2;
    }

    isClient(): boolean {
        let user = this.getCurrentUser();
        if (!user) return false;
        return user.role[0].idRole === 1;
    }

    isAnon() {
        return this.getCurrentUser() == null;
    }
}
