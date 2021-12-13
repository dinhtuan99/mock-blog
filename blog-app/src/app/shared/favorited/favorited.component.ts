import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css'],
})
export class FavoritedComponent implements OnInit {
  status: boolean = false;
  @Input() article!: Article;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.status = this.article.favorited;
  }

  like() {
    this.status = true;
    console.log(1);

    this.articlesService
      .favoriteArticle(this.article.slug)
      .subscribe((data) => {
        this.article = data.article;
      });
  }

  unLike() {
    console.log(2);
    this.status = false;
    this.articlesService
      .unfavoriteArticle(this.article.slug)
      .subscribe((data) => {
        this.article = data.article;
      });
  }
}
