import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Article, IArticleCreate } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles: IArticleCreate = {} as IArticleCreate;
  tags!: FormControl;
  constructor(private articleService: ArticlesService, private formBuilder: FormBuilder) {
    this.formArt = this.formBuilder.group({
      title: '',
      description: '',
      body: ''
    })
    this.articles.article.tagList = [];
  }

  ngOnInit(): void {

  }
  get iF() {
    return this.formArt.controls;
  }
  onSubmit() {

    // this.articles = {
    //   article: {
    //     title: this.iF.title.value,
    //     description: this.iF.description.value,
    //     body: this.iF.body.value,
    //     tagList: []
    //   }
    // }
    this.articleService.cerateArticle(this.articles).subscribe(res => {
      

    })

  }
  addTag() {
    // retrieve tag control
    const tag = this.tags.value;
    // only add tag if it does not exist yet
    if (this.articles.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tags.reset('');
  }
}
