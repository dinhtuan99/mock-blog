import { Component, Input, OnInit } from '@angular/core';
import { Article, IArticles } from '../../models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

@Input() articles: Article[] = [];;

  constructor() { }

  ngOnInit(): void {
  }

}
