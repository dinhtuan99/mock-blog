import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/articles.model';
import { Comment, IComment } from 'src/app/models/comment.model';
import { IProfile, IUser } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articles!: Article;
  currentUser!: IUser;
  slugA: string = '';
  commentCre: IComment[] = [];
  comment: Comment[] = [];
  commentControl = new FormControl();
  isCurrentUser!: boolean;
  checkFollow!: boolean;
  isAuth!: boolean;
  checkUser!: boolean;
  profile!: IProfile;

  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService, private router: Router, private commentService: CommentService) { }
  ngOnInit(): void {
    this.isAuth = this.userService.currentUserValue() != null;
    this.activateRoute.paramMap.subscribe(params => {
      this.slugA = params.get('slug') as string;
      this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
        this.isCurrentUser = res.article.author.username == this.userService.currentUserValue()?.user.username;
        if (res) {
          this.articles = res.article;
        }
        this.getComment()
      })
    })
    this.activateRoute.params
      .pipe(
        switchMap((data) => {
          if (
            this.userService.currentUserValue().user.username ==
            data.username
          ) {
            this.checkUser = true;
          } else {
            this.checkUser = false;
          }
          return this.getProfile(data.username);
        })
      )
      .subscribe((data) => {
        this.profile = data;
        this.checkFollow = data.profile.following;
      });
  }
  deleteArticle() {
    this.articleService.deleteArticle(this.slugA).subscribe(res => {
      this.router.navigateByUrl('/')
    })
  }

  getComment() {
    this.commentService.getComment(this.slugA).subscribe(res => {
      this.comment = res.comments

    })
  }

  addComment() {
    const commentBody = this.commentControl.value;
    this.commentService.addCommentArticle(commentBody, this.slugA).subscribe(res => {
      this.commentCre.unshift(res);
      this.commentControl.reset('');
      this.getComment();
    })
  }
  deleteComment(comment: Comment) {
    this.commentService.deleteComment(this.slugA, comment.id).subscribe(res => {
      this.comment = this.comment.filter((item) => item !== comment)
      this.getComment();
    })
  }
  like() {
    this.articleService.favoriteArticle(this.articles.slug).subscribe((data) => {
      this.articles = data.article;
    })
  }

  disLike() {
    this.articleService.unfavoriteArticle(this.articles.slug).subscribe((data) => {
      this.articles = data.article;
    })
  }

  follow(userName: string): void {
    this.userService.followUser(userName).subscribe((data) => {
      this.checkFollow = data.profile.following;
    });
  }

  unFollow(userName: string): void {
    this.userService.unfollowUser(userName).subscribe((data) => {
      this.checkFollow = data.profile.following;
    });
  }
  getProfile(username: string) {
    return this.userService.getProfile(username);
  }
}
