import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleYourfeedComponent } from './article-yourfeed.component';

describe('ArticleYourfeedComponent', () => {
  let component: ArticleYourfeedComponent;
  let fixture: ComponentFixture<ArticleYourfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleYourfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleYourfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
