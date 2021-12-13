import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { FavoritedComponent } from './favorited/favorited.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/edit-dialog/dialog.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ArticleListComponent,
    FavoritedComponent,
    DialogComponent,
    LoginDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ArticleListComponent
  ],
  entryComponents: [
    DialogComponent,
    LoginDialogComponent
  ]
})
export class SharedModule { }
