import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/_models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-us',
    templateUrl: './us.component.html',
    styleUrls: ['./us.component.css'],
})
export class UsComponent implements OnInit {
    focus;
    focus1;

    constructor(private userService: UserService) {}

    users: User[] = [];

    /*
    showUsers() {
        this.userService.getUsers().subscribe((data) =>
            data.map((user: User) => {
                this.users.push(user);
            })
        );
    }*/

    ngOnInit(): void {}
}
