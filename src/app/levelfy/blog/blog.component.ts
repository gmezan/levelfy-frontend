import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
    blogTitle: string = 'Nuestro Blog';

    constructor() {}

    ngOnInit(): void {}
}
