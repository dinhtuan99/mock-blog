import { Comment } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment!: IComment;
  constructor() { }

  ngOnInit(): void {
    console.log(this.comment);
  }


}
