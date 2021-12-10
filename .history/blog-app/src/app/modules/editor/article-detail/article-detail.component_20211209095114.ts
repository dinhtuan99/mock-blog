import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  articles!: Article;
  currentUser!: IUser;
  slugA: string = '';
  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      
      this.slugA = params.get('slug') as string;
      

      this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
        if (res) {
          this.articles = res.article;
          
        }
      })
    })
  }
  deleteArticle() {
    this.articleService.deleteArticle(this.slugA).subscribe(res => {
      
    })
  }
}
