import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Article, IArticleCreate } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles!: IArticleCreate;
  tags: string[] = [];
  isSubmit: boolean = false;
  constructor(private articleService: ArticlesService,
    private formBuilder: FormBuilder,
    private router: Router) { }

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
    this.isSubmit = true;
    this.articles = {
      article: {
        title: this.iF.title.value,
        description: this.iF.description.value,
        body: this.iF.body.value,
        tagList: this.tags
      }
    }
    this.articleService.createArticle(this.articles).subscribe(res => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Add article in successfully'
      })

      this.router.navigateByUrl('/article/' + res.article.slug)
    })
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
      console.log(tag)

      // tag !== tagName
    )
  }

}
