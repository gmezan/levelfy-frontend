import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data-service.service';
import { User } from '../../shared/_models/user.model';

const uri = '/auth';

@Injectable()
export class AuthService extends DataService<User> {
    authenticated = false;
    private _currentUser;

    constructor(http: HttpClient) {
        // AuthController
        super(uri, http);
    }

    authenticate(credentials, callback) {
        const headers = new HttpHeaders(
            credentials
                ? {
                      authorization:
                          'Basic ' +
                          btoa(
                              credentials.username + ':' + credentials.password
                          ),
                  }
                : {}
        );

        this.http.get('ser', { headers: headers }).subscribe((response) => {
            this.authenticated = !!response['name'];
            return callback && callback();
        });
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        return false;
    }

    get currentUser(): any {
        let token = localStorage.getItem('token');
        if (!token) return null;
    }
}
