import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IArticles } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-favoritePost',
  templateUrl: './favoritePost.component.html',
  styleUrls: ['./favoritePost.component.css']
})
export class FavoritePostComponent implements OnInit {
  favoritePost!: IArticles;

  constructor(
    private serviecArticles: ArticlesService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent?.params.pipe(
      switchMap(data => {
      return this.serviecArticles.getListArticlesByFavorited(data.username)
    })).subscribe(data => {
      this.favoritePost = data
    })

  }

}
