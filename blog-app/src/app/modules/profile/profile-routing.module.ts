import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const profileRoutes: Routes = [
    
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
