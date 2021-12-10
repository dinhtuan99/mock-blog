import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleUpdate } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles!: IArticleUpdate;
  tags: string[] = [];
  slugA: string = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private activateRoute: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.formArt = this.formBuilder.group({
      title: '',
      description: '',
      body: '',
      tagForm: ''
    })
    this.activateRoute.paramMap.subscribe(params => {
      this.slugA = params.get('slug') as string;
      this.articleService.updateArticle(this.articles, this.slugA).subscribe(res => {
        
        this.iF.title.setValue(res.article.title)

      })

    })
  }
  get iF() {
    return this.formArt.controls;
  }
  onSubmit() {

  }
  onAddTag() {
    
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
