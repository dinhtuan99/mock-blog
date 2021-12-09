import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditorComponent } from './editor.component';
import { NewArticleComponent } from './new-article/new-article.component';

const editorRoutes: Routes = [
  {
    path: 'new', component: NewArticleComponent
  },
  {
    path: 'article/:slug', component: ArticleDetailComponent
  },
  {
    path: 'edit/:slug', component: EditArticleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(editorRoutes)
  ],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
