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
  top = 20;
  skip = 0;
  constructor(
    private serviecArticles: ArticlesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          return this.serviecArticles.getListArticlesByAuthor(params.username, this.top, this.skip);
        })
      )
      .subscribe((data) => {
          this.myPost = data;
      });
  }
}
