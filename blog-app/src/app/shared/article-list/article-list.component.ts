import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article, IArticles } from '../../models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  isSubmitting: boolean = false;
  @Input() articles!: IArticles;
  @Output() paging = new EventEmitter<{ top: number, skip: number }>();
  skip: number = 0;
  top: number = 1;
  length: number = 0;
  totalPage: number[] = [];
  index: number = 0;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
      if (this.articles.articlesCount > 0) {
        this.totalPage = Array(Math.ceil(this.articles?.articlesCount / this.top));
        console.log(this.articles);
      }
  }

  changePagging(t: number, s: number) {
    this.paging.emit(
      {
        top: t,
        skip: s
      });
  }

  changePage(i: number) {
    this.index = i;
    this.skip = i * this.top;
    this.changePagging(this.top, this.skip);
  }

  previousPage() {
    if (this.skip >= this.top) {
      this.index--;
      this.skip -= this.top;
      this.changePagging(this.top, this.skip);
    }
  }

  nextPage() {
    if (this.skip <= this.length - this.top) {
      this.index++;
      this.skip = +this.skip + +this.top;
      this.changePagging(this.top, this.skip);
    }
  }
}
