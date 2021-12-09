import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Article } from 'src/app/models/articles.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles: Article = {} as Article;
  constructor() { }

  ngOnInit(): void {
  }

}
