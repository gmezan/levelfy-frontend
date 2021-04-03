import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { Fragment } from '../../../shared/_blog/fragment.model';
import { BlogPostService } from '../../../core/services/blog-post.service';
import { BlogPost } from 'app/shared/_blog/blog.post';

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent extends NavbarPageComponent implements OnInit {
    blogTitle: string = 'Nuestro Blog';
    isSidebarHidden: boolean = false;

    fragments: Fragment[] = [];

    constructor(
        @Inject(DOCUMENT) document: any,
        private blogService: BlogPostService
    ) {
        super(document);
        console.log("Printing...");
        let item: BlogPost;
        blogService.getAll().subscribe(res => {
            item = res[0];
        });
    }

    ngOnInit(): void {
        //this.blog.body.forEach((f: Fragment) => this.fragments.push(f));
        console.log(this.fragments);

        this.putFixedNavbarDark();

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
