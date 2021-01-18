import { Injectable } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { GeneralService } from './_general-service.service';

@Injectable()
export class UserService extends GeneralService {
    apiUrl = '/u/dev/listAll';

    getUsers() {
        return this.http.get<User[]>(this.buildPath(this.apiUrl));
    }
}
