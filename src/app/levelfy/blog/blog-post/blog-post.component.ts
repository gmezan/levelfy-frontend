import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { Fragment } from '../../../shared/_blog/fragment.model';
import { BlogPostService } from '../../../core/services/blog-post.service';
import { BlogPost } from 'app/shared/_blog/blog.post';
import { ActivatedRoute } from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent extends NavbarPageComponent implements OnInit {
    
    isSidebarHidden: boolean = false;

    fragments: Fragment[] = [];
    idPost: any;
    post: BlogPost;

    constructor(
        @Inject(DOCUMENT) document: any,
        private blogService: BlogPostService,
        private route: ActivatedRoute
    ) {
        super(document);
        this.idPost = route.snapshot.paramMap.get('idBlog');
        console.log('Printing paramMap');
        console.log(this.idPost);
    }

    ngOnInit(): void {
        //this.blog.body.forEach((f: Fragment) => this.fragments.push(f));
        this.blogService.get(this.idPost).subscribe((res) => {
            console.log(res);
            this.post = res;
            this.post.dateTime = DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(this.post.dateTime)));
            JSON.parse(this.post.fragments).forEach((f: Fragment) => this.fragments.push(f));
        });


        this.putFixedNavbarDark();

        let sidebar = this.document.getElementById('blogSidebar');
        this.isSidebarHidden = !!sidebar.classList.contains('active');
    }

}
