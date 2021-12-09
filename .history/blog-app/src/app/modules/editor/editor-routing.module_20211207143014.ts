import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewArticleComponent } from './new-article/new-article.component';

const editorRoutes: Routes = [
  {
    path: '/new', component: NewArticleComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(editorRoutes)
  ],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
