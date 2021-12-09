import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/articles.model';
import { IUser } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article[] = [];
  currentUser!: IUser;
  slug!: string;
  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService) { }

  ngOnInit(): void {


    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      let slugA = params.get('slug')
    })


  }

}
