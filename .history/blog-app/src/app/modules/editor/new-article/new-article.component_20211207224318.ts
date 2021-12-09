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
  articles!: IArticleCreate;
  tags: string[] = []
  constructor(private articleService: ArticlesService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formArt = this.formBuilder.group({
      title: '',
      description: '',
      body: '',
      tagForm: ''
    })
  }
  get iF() {
    return this.formArt.controls;
  }
  onSubmit() {

    this.articles = {
      article: {
        title: this.iF.title.value,
        description: this.iF.description.value,
        body: this.iF.body.value,
        tagList: this.tags
      }
    }
    this.articleService.cerateArticle(this.articles).subscribe(res => {
      console.log(res);
    })

  }
  onAddTag() {

    console.log(this.iF.tagForm.value);
    this.tags.push(this.iF.tagForm.value)
    console.log(this.tags);

  }

}
