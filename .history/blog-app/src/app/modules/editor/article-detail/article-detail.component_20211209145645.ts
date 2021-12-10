import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, IArticle } from 'src/app/models/articles.model';
import { IComment, IComments } from 'src/app/models/comment.model';
import { IUser } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentService } from 'src/app/services/comment.service';
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
  comments!: IComment;
  comment!: IComments;
  commentControl = new FormControl();
  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService, private router: Router, private commentService: CommentService) { }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      this.slugA = params.get('slug') as string;
      console.log(this.slugA);

      this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
        if (res) {
          this.articles = res.article;
          console.log(this.articles);
        }
        this.getComment()
      })
    })
  }
  deleteArticle() {
    this.articleService.deleteArticle(this.slugA).subscribe(res => {
      console.log(res);
    })
  }

  getComment() {
    this.commentService.getComment(this.slugA).subscribe(res => {
      console.log(res);
      // this.comments = res

    })
  }

  addComment() {
    const commentBody = this.commentControl.value;
    console.log(commentBody);

    this.commentService.addCommentArticle(this.slugA, commentBody).subscribe(res => {
      console.log(res);
      // this.comments.unshift(res);
      // this.commentControl.reset('')
    })
  }
}
