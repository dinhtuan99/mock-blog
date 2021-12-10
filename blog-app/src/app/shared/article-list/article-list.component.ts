import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { Article, IArticles } from '../../models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  isSubmitting: boolean = false;
  @Input()
  articles!: IArticles;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {

  }
}
