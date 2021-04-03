import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../../core/services/blog-post.service';
import { BlogPost } from '../../../shared/_blog/blog.post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogPosts: BlogPost[];

  constructor(
      private blogPostService: BlogPostService,
      private router: Router
  ) {
    blogPostService.getAll().subscribe((res) => this.blogPosts = res);
  }

  ngOnInit(): void {
  }

  toPost(id: number){
    this.router.navigateByUrl(`/blog/${id}`,{skipLocationChange: true});
  }

}
