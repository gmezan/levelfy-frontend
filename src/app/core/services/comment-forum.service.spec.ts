import { TestBed } from '@angular/core/testing';

import { CommentForumService } from './comment-forum.service';

describe('CommentForumService', () => {
  let service: CommentForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
