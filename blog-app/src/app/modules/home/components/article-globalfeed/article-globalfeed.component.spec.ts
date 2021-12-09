import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleGlobalfeedComponent } from './article-globalfeed.component';

describe('ArticleGlobalfeedComponent', () => {
  let component: ArticleGlobalfeedComponent;
  let fixture: ComponentFixture<ArticleGlobalfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleGlobalfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleGlobalfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
