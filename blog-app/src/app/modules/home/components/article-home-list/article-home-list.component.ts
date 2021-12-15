import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleListConfig, IArticles } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-article-home-list',
  templateUrl: './article-home-list.component.html',
  styleUrls: ['./article-home-list.component.css'],
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
  ) {}

  ngOnInit(): void {
      this.homeService.tag
        .pipe(
          switchMap((res: any) => {
            if (res.type === 'all') {
              this.query.limit = this.top;
              this.query.offset = this.skip;
              return this.connectApiService.getListArticlesByPage(this.query);
            } else if (res.type === 'feed') {
              this.query.limit = this.top;
              this.query.offset = this.skip;
              return this.connectApiService.getFeedArticlesByPage(this.query);
            } else {
              this.query = {};
              return this.connectApiService.getListArticlesByTag(
                res.filters.tag,
                this.top,
                this.skip
              );
            }
          })
        )
        .subscribe((data: any) => {
          this.loading = false;
          this.results = data;
        });
  }

  paging(e: any): void {
    this.top = e.top;
    this.skip = e.skip;
    this.homeService.tag
      .pipe(
        switchMap((res: any) => {
          if (res.type === 'all') {
            this.query.limit = this.top;
            this.query.offset = this.skip;
            return this.connectApiService.getListArticlesByPage(this.query);
          } else if (res.type === 'feed') {
            this.query.limit = this.top;
            this.query.offset = this.skip;
            return this.connectApiService.getFeedArticlesByPage(this.query);
          } else {
            return this.connectApiService.getListArticlesByTag(
              res.filters.tag,
              this.top,
              this.skip
            );
          }
        })
      )
      .subscribe((data: any) => {
        this.loading = false;
        this.results = data;
      });
  }
}
