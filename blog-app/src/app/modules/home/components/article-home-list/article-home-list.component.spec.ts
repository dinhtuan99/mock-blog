import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHomeListComponent } from './article-home-list.component';

describe('ArticleHomeListComponent', () => {
  let component: ArticleHomeListComponent;
  let fixture: ComponentFixture<ArticleHomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleHomeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
