import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditorComponent } from './editor.component';
import { NewArticleComponent } from './new-article/new-article.component';

const editorRoutes: Routes = [
  {
    path: 'new', component: NewArticleComponent
  },
  {
    path: 'article/:slug', component: ArticleDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(editorRoutes)
  ],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
