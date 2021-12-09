import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article!: Article;
  constructor() { }

  ngOnInit(): void {
  }

}
