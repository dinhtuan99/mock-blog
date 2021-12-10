import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { FavoritedComponent } from './favorited/favorited.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ArticleListComponent,
    FavoritedComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ArticleListComponent
  ]
})
export class SharedModule { }
