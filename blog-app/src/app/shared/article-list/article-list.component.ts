import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IArticles } from '../../models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnChanges {
  isSubmitting: boolean = false;
  @Input() articles!: IArticles;
  @Input() skip!: number;
  @Input() top!: number;
  @Output() paging = new EventEmitter<{ top: number; skip: number }>();
  length: number = 0;
  totalPage: number[] = [];
  index: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.articles) {
      this.totalPage = Array(Math.ceil(this.articles.articlesCount / this.top));
    }
  }

  ngOnInit(): void {
    if (this.articles) {
      this.totalPage = Array(Math.ceil(this.articles.articlesCount / this.top));
    }
  }

  changePagging(t: number, s: number) {
    this.paging.emit({
      top: t,
      skip: s,
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
