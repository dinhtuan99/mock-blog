import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MyPostComponent } from './myPost/myPost.component';
import { FavoritePostComponent } from './favoritePost/favoritePost.component';

@NgModule({
  declarations: [ProfileComponent, MyPostComponent, FavoritePostComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
