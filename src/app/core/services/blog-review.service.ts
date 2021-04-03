import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../common/data-service.service';
import { BlogReview } from '../../shared/_blog/blog-review.model';

const uri = '/model/blog-review';

@Injectable({
  providedIn: 'root'
})
export class BlogReviewService extends DataService<BlogReview>{

  constructor(http: HttpClient) {
    super(uri,http);
  }
}
