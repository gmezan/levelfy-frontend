import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../../core/services/blog-post.service';
import { BlogPost } from '../../../shared/_blog/blog.post';
import { Router } from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogPosts: BlogPost[];
  principal: BlogPost;

  constructor(
      private blogPostService: BlogPostService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.blogPostService.getAll().subscribe((res) => {
      this.blogPosts = res;

      this.blogPosts.map((post: BlogPost) => {
        post.dateTime = DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).format(new Date(Date.parse(post.dateTime)));
      }).reverse();
      this.principal = this.blogPosts.shift();
      console.log('aea');
      console.log(this.blogPosts);
    });
  }

  toPost(id: number){
    this.router.navigateByUrl(`/blog/${id}`,{skipLocationChange: true});
  }

}
