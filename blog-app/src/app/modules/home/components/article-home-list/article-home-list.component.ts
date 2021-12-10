import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleListConfig, IArticles } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-article-home-list',
  templateUrl: './article-home-list.component.html',
  styleUrls: ['./article-home-list.component.css']
})
export class ArticleHomeListComponent implements OnInit {
  results!: IArticles;
  loading: boolean = true;
  top: number = 20;
  skip: number = 0;
  query: ArticleListConfig = {};
  constructor(
    private connectApiService: ArticlesService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      this.query = {}
      switch (Object.keys(param)[0]) {
        case 'tag':
          this.query.tag = param.tag;
          break;
        case 'author':
          this.query.author = param.author;
          break;
        case 'favorited':
          this.query.favorited = param.favorited;
          break;
        case undefined:
          this.query = {}
          break
      }
      this.homeService.tag.subscribe((res: any) => {
        if (res.type === 'all') {
          this.query.limit = this.top;
          this.query.offset = this.skip;
          this.connectApiService.getListArticlesByPage(this.query).subscribe((data) => {
            if (data) {
              this.loading = false;
              this.results = data;
            }
          });
        } else if (res.type === 'feed') {
          this.query.limit = this.top;
          this.query.offset = this.skip;
          this.connectApiService.getFeedArticlesByPage(this.query).subscribe((data) => {
            if (data) {
              this.loading = false;
              this.results = data;
            }
          });
        }
      });
    })

    this.homeService.tagName.subscribe((res) => {
      if (res) {
        this.connectApiService
          .getListArticlesByTag(res, this.top, this.skip)
          .subscribe((data) => {
            this.results = data;
          });
      }
    });
  }

  paging(e: any): void {
    this.top = e.top;
    this.skip = e.skip;
    this.homeService.tag.subscribe((res: any) => {
      if (res) {
        if (res.type === 'all') {
          this.query.limit = this.top;
          this.query.offset = this.skip;
          this.connectApiService.getListArticlesByPage(this.query).subscribe((data) => {
            if (data) {
              this.loading = false;
              this.results = data;
            }
          });
        } else if (res.type === 'feed') {
          this.query.limit = this.top;
          this.query.offset = this.skip;
          this.connectApiService.getFeedArticlesByPage(this.query).subscribe((data) => {
            if (data) {
              this.loading = false;
              this.results = data;
            }
          });
        }
      }
    });

    this.homeService.tagName.subscribe((res) => {
      if (res) {
        this.connectApiService
          .getListArticlesByTag(res, this.top, this.skip)
          .subscribe((data) => {
            this.results = data;
          });
      }
    });
  }

  onDestroy() {
    this.loading = true;
  }

}
