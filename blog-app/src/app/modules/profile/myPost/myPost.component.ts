import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IArticles } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-myPost',
  templateUrl: './myPost.component.html',
  styleUrls: ['./myPost.component.css'],
})
export class MyPostComponent implements OnInit {
  myPost!: IArticles;
  top!:number ;
  skip!:number;
  constructor(
    private serviecArticles: ArticlesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    if(this.top == undefined) {
      this.top = 1;
    }
    if(this.skip == undefined) {
      this.skip = 0;
    }
    this.getMyPost(this.top, this.skip)
  }

  getMyPost(top: number, skip: number) {
    return this.activatedRoute.params
      .pipe(
        switchMap((params) => {

          return this.serviecArticles.getListArticlesByAuthor(params.username, top, skip);
        })
      )
      .subscribe((data) => {
          this.myPost = data;
      });
  }

  paging(e:any):void {
    this.top = e.top;
    this.skip = e.skip;
    this.getMyPost(this.top, this.skip)
  }
}
