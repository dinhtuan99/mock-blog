import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles.model';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article!: Article;
  currentUser!: IUser;
  constructor() { }

  ngOnInit(): void {
  }

}
