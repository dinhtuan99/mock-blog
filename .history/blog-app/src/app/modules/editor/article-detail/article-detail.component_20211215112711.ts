import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/articles.model';
import { Comment, IComment } from 'src/app/models/comment.model';
import { IProfile, IUser } from 'src/app/models/user.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import Swal from 'sweetalert2';

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
  status: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
    private articleService: ArticlesService,
    private userService: UserService,
    private router: Router,
    private commentService: CommentService) { }
  ngOnInit(): void {
    // this.isAuth = this.userService.currentUserValue() != null;
    // this.activateRoute.paramMap.subscribe(params => {
    //   this.slugA = params.get('slug') as string;
    //   this.articleService.getArticleBySlug(this.slugA).subscribe(res => {
    //     this.isCurrentUser = res.article.author.username == this.userService.currentUserValue()?.user.username;
    //     if (res) {
    //       this.articles = res.article;
    //       if (!this.isCurrentUser) {
    //         this.getProfile(res.article.author.username).subscribe(res => {
    //           this.checkFollow = res.profile.following
    //         })
    //       }

    //     }
    //     this.getComment()
    //   })
    // })
    // this.status = this.articles.favorited;
    console.log(this.articles);

    this.isAuth = this.userService.currentUserValue() != null;
    this.activateRoute.paramMap.pipe(
      switchMap(params => {
        console.log(params);

        this.slugA = params.get('slug') as string;
        return forkJoin([this.articleService.getArticleBySlug(this.slugA), this.commentService.getComment(this.slugA)]) //call 2 api 1 lúc
      }),
      map(res => {
        console.log(res);
        this.comment = res[1].comments
        return res[0]
      }),
      filter(res => {
        this.isCurrentUser = res.article.author.username == this.userService.currentUserValue()?.user.username;
        this.articles = res.article;
        return !this.isCurrentUser
      }),
      switchMap(res => {
        console.log(res);
        return this.getProfile(res.article.author.username)
      })
    ).subscribe(res => {
      this.checkFollow = res.profile.following
    })
  }

  deleteArticle() {
    Swal.fire({
      icon: 'question',
      title: 'Do you really want to delete this article?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#fa6342',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.articleService.deleteArticle(this.slugA).subscribe(res => {
          if (res) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Delete in successfully'
            })
          }
          this.router.navigateByUrl('/')
        })
        return true
      } else {
        return false
      }
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
    Swal.fire({
      icon: 'question',
      title: 'Do you really want to delete this comment?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#fa6342',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.commentService.deleteComment(this.slugA, comment.id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Delete in successfully'
          })
          this.comment = this.comment.filter((item) => item !== comment)
          this.getComment();
        })
        return true
      } else {
        return false
      }
    })
  }

  like() {
    this.status = true;
    this.articleService.favoriteArticle(this.articles.slug).subscribe((data) => {
      this.articles = data.article;
    })
  }

  disLike() {
    this.status = false;
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
