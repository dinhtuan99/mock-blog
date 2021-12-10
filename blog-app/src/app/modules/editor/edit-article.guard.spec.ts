import { TestBed } from '@angular/core/testing';

import { EditArticleGuard } from './edit-article.guard';

describe('EditArticleGuard', () => {
  let guard: EditArticleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditArticleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
