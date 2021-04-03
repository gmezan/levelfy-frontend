import { TestBed } from '@angular/core/testing';

import { BlogReviewService } from './blog-review.service';

describe('BlogReviewService', () => {
  let service: BlogReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
