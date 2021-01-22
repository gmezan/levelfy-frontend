import { TestBed } from '@angular/core/testing';

import { CourseSuggestionService } from './course-suggestion.service';

describe('CourseSuggestionService', () => {
  let service: CourseSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
