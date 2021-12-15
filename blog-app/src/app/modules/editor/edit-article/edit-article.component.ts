import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IArticle, IArticleCreate, IArticleUpdate } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  formArt!: FormGroup;
  articles!: IArticleCreate;
  tags: string[] = [];
  slugA: string = '';
  isSubmit: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.formArt = this.formBuilder.group({
      title: '',
      description: '',
      body: '',
      tagForm: ''
    })
    this.activateRoute.paramMap.pipe(
      switchMap(params => {
        this.slugA = params.get('slug') as string;
        return this.articleService.getArticleBySlug(this.slugA)
      })
    ).subscribe(res => {
      this.iF.title.setValue(res.article.title);
      this.iF.description.setValue(res.article.description);
      this.iF.body.setValue(res.article.body);
      this.tags = res.article.tagList
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
    this.articleService.updateArticle(this.articles, this.slugA).subscribe(res => {
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
        title: 'Update in successfully'
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
      tag !== tagName
    )
  }
}
