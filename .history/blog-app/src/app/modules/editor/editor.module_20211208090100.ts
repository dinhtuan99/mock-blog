import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditArticleComponent } from './edit-article/edit-article.component';



@NgModule({
  declarations: [
    EditorComponent,
    NewArticleComponent,
    ArticleDetailComponent,
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EditorModule { }
