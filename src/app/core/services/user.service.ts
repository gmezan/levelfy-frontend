import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { DataService } from '../common/data-service.service';

const uri = '/model/user';

@Injectable()
export class UserService extends DataService<User> {
    apiCurrent = '/model/user/me';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    getCurrent() {
        return this.http.get<User>(this.buildPath(this.apiCurrent));
    }

    getUsers() {
        return this.getAll();
    }
}
