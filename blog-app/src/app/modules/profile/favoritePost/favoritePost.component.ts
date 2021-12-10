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
  top!:number ;
  skip!:number;

  constructor(
    private serviecArticles: ArticlesService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    if(this.top == undefined) {
      this.top = 20;
    }
    if(this.skip == undefined) {
      this.skip = 0;
    }
    this.getMyFavorives(this.top, this.skip)

  }

  getMyFavorives(top: number, skip: number) {
    return this.activatedRoute.parent?.params.pipe(
      switchMap(data => {
      return this.serviecArticles.getListArticlesByFavorited(data.username, top, skip)
    })).subscribe(data => {
      this.favoritePost = data
    })
  }

  paging(e:any):void {
    this.top = e.top;
    this.skip = e.skip;
    this.getMyFavorives(this.top, this.skip)
  }

}
