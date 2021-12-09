import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, IArticle } from 'src/app/models/articles.model';
import { IUser } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article!: IArticle;
  currentUser!: IUser;
  slugA: string = '';
  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService) { }

  ngOnInit(): void {

    // this.activateRoute.data.subscribe(data => {
    //   console.log(data);

    // })
    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      this.slugA = params.get('slug') as string;
      console.log(this.slugA);

      this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
        console.log(res);
        this.article = res;
      })


    })


  }

}
