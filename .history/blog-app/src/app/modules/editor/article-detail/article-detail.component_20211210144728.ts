import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/articles.model';
import { Comment, IComment } from 'src/app/models/comment.model';
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
  commentCre: IComment[] = [];
  comment: Comment[] = [];
  commentControl = new FormControl();
  isCurrentUser!: boolean;
  checkFollow!: boolean;
  isAuth!: boolean;
  constructor(private activateRoute: ActivatedRoute, private articleService: ArticlesService, private userService: UserService, private router: Router, private commentService: CommentService) { }
  ngOnInit(): void {

    this.isAuth = this.userService.currentUserValue().user != null

    this.activateRoute.paramMap.subscribe(params => {
      console.log(params);
      this.slugA = params.get('slug') as string;
      console.log(this.slugA);

      this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
        console.log('ok1', res.article.author.username, this.userService.currentUserValue()?.user.username);
        this.isCurrentUser = res.article.author.username == this.userService.currentUserValue()?.user.username;
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
      this.router.navigateByUrl('/')
    })
  }

  getComment() {
    this.commentService.getComment(this.slugA).subscribe(res => {
      console.log('comall', res);
      this.comment = res.comments

    })
  }

  addComment() {
    const commentBody = this.commentControl.value;
    console.log(commentBody);

    this.commentService.addCommentArticle(commentBody, this.slugA).subscribe(res => {
      console.log(res);
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

  unLike() {
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
}
