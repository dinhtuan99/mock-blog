import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';



@NgModule({
  declarations: [
    EditorComponent,
    NewArticleComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EditorModule { }
