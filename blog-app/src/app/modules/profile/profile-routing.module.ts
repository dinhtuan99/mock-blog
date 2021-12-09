import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritePostComponent } from './favoritePost/favoritePost.component';
import { MyPostComponent } from './myPost/myPost.component';
import { ProfileComponent } from './profile.component';

const profileRoutes: Routes = [
  {
    path: 'profile/:username',
    component: ProfileComponent,
    children: [
      { path: '', component: MyPostComponent },
      { path: 'favorites', component: FavoritePostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
