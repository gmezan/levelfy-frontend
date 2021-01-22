import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../common/data-service.service';
import { User } from '../../shared/_models/user.model';

const uri = '/auth';

@Injectable()
export class AuthService extends DataService<User> {
    constructor(http: HttpClient) {
        super(uri, http);
    }

    login(credentials) {
        return this.create(credentials);
    }

    logout() {}

    isLoggedIn() {
        return false;
    }
}
