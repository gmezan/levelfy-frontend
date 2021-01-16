import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../shared/_models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:8080/u/dev/listAll';

    getUsers() {
        return this.http.get<User[]>(this.apiUrl);
    }
}
