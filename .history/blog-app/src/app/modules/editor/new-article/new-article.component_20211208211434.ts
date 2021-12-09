import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private articleService: ArticlesService, private formBuilder: FormBuilder, private router: Router) {

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
    this.articleService.createArticle(this.articles).subscribe(res => {
      this.router.navigateByUrl('/article/' + res.article.slug)
      console.log(res);
    })

  }
  onAddTag() {
    console.log(this.iF.tagForm.value);
    if (this.iF.tagForm.value) {
      if (this.tags.indexOf(this.iF.tagForm.value) < 0) {
        this.tags.push(this.iF.tagForm.value)
      }
    }
    this.iF.tagForm.setValue('')

  }
  removeTag(tagName: string) {
    this.tags = this.tags.filter(tag =>
      tag !== tagName
    )
  }

}
