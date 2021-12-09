import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Article } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles: Article = {} as Article;
  tags!: FormControl;
  constructor(private articleService: ArticlesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formArt = this.formBuilder.group({
      title: '',
      description: '',
      body: ''
    })
    this.articles.tagList = [];
  }
  get iF() {
    return this.formArt.controls;
  }
  onSubmit() {
    let obj = {
      title: this.iF.title.value,
      description: this.iF.description.value,
      body: this.iF.body.value,

    }
    this.articleService.cerateArticle(obj).subscribe(res => {

    })

  }
}
