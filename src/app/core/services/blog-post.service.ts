import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { BlogPost } from '../../shared/_blog/blog.post';
import { HttpClient } from '@angular/common/http';

const uri = '/model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService extends DataService<BlogPost>{

  constructor(http: HttpClient) {
    super(uri,http);
  }
}
