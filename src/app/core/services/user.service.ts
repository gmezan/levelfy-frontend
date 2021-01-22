import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { DataService } from '../common/data-service.service';

const uri = '/model/user';

@Injectable()
export class UserService extends DataService<User> {
    constructor(http: HttpClient) {
        super(uri, http);
    }

    getUsers() {
        return this.getAll();
    }
}
