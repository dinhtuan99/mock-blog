import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleUpdate } from 'src/app/models/articles.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles!: IArticleUpdate;
  tags: string[] = []
  constructor(private formBuilder: FormBuilder, private router: Router, private activateRoute: ActivatedRoute) { }

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
