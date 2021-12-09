import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-article-home-list',
  templateUrl: './article-home-list.component.html',
  styleUrls: ['./article-home-list.component.css']
})
export class ArticleHomeListComponent implements OnInit {
  results: Article[] = [];
  loading: boolean = true;

  constructor(
    private connectApiService: ArticlesService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    // this.feedChange.getFeed().subscribe(data => {
    //   console.log(data);
    //   console.log('aaa');

    // })
    this.homeService.tag.subscribe((res: any) => {
      console.log("ffff");

      if (res.type === 'all') {
        this.connectApiService.getFeedArticlesByPage(10,0).subscribe((data) => {
          if (data) {
            this.loading = false;
            this.results = data.articles;
            // console.log(this.results);
          }
        });
      } else if (res.type === 'feed') {
        this.connectApiService.getFeedArticlesByPage(10,0).subscribe((data) => {
          if (data) {
            this.loading = false;
            this.results = data.articles;
            // console.log(this.results);
          }
        });
      }
    });
    this.homeService.tagName.subscribe((res) => {
      this.connectApiService
        .getListArticlesByTag(res)
        .subscribe((data) => {
          this.results = data.articles;
        });
    });
  }

  onDestroy() {
    this.loading = true;
  }

}
