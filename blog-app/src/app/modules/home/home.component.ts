import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ArticleListConfig, IArticles } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { HomeService } from './components/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  results!: IArticles;
  top: number = 20;
  skip: number = 0;
  query: ArticleListConfig = {};
  constructor(
    private homeService: HomeService,
    private connectApiService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.homeService.tag
      .pipe(
        switchMap((res: any) => {
          if (res.type === 'all') {
            this.query.limit = this.top;
            this.query.offset = this.skip;
            return this.connectApiService.getListArticlesByPage(this.query);
          } else {
            this.query.limit = this.top;
            this.query.offset = this.skip;
            return this.connectApiService.getFeedArticlesByPage(this.query);
          }
        })
      )
      .subscribe((data: any) => {
        this.results = data;
      });
  }
}
