import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
    blogTitle: string = 'Nuestro Blog';
    isSidebarHidden: boolean = false;

    constructor(@Inject(DOCUMENT) private document: any) {}

    ngOnInit(): void {
        let sidebar = this.document.getElementById('blogSidebar');
        this.isSidebarHidden = !!sidebar.classList.contains('active');
    }

    hideSidebar(): void {
        let sidebar = this.document.getElementById('blogSidebar');
        sidebar.classList.add('active');
        this.isSidebarHidden = true;
    }

    toggleSidebar(): void {
        let sidebar = this.document.getElementById('blogSidebar');
        this.isSidebarHidden = false;
        if (sidebar.classList.contains('active'))
            sidebar.classList.remove('active');
        else sidebar.classList.add('active');
    }
}
