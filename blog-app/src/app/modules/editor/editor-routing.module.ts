import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditArticleGuard } from './edit-article.guard';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditorComponent } from './editor.component';
import { NewArticleComponent } from './new-article/new-article.component';

const editorRoutes: Routes = [
  {
    path: 'new', component: NewArticleComponent, canActivate: [AuthGuard], canDeactivate: [EditArticleGuard]
  },
  {
    path: 'article/:slug', component: ArticleDetailComponent
  },
  {
    path: 'edit/:slug', component: EditArticleComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(editorRoutes)
  ],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
