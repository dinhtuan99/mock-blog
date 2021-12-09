import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article } from '../../models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
isSubmitting: boolean=false;
@Input() articles:Article[]= [];

  constructor(private articlesService:ArticlesService) { }

  ngOnInit(): void {

  }
  toggleFavorite(value:any) {
    this.isSubmitting = true;
        if (!this.articles[value].favorited) {
           this.articlesService.favoriteArticle(this.articles[value].slug)
          .pipe(tap(
            data => {
              console.log(data);
              this.isSubmitting = false;
              this.articles[value]['favoritesCount']++;
              this.articles[value].favorited =!this.articles[value].favorited;
              console.log(this.articles[value]['favoritesCount']);
            },
            err => this.isSubmitting = false
          )).subscribe();

        } else {
          this.articlesService.unfavoriteArticle(this.articles[value].slug)
          .pipe(tap(
            data => {
              console.log(data);
              this.isSubmitting = false;
              this.articles[value]['favoritesCount']--;
              this.articles[value].favorited =!this.articles[value].favorited;
              console.log(this.articles[value]['favoritesCount']);
            },
            err => this.isSubmitting = false
          )).subscribe();;
        }
  }
}
