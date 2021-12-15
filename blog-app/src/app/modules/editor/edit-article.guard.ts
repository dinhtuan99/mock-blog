import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NewArticleComponent } from './new-article/new-article.component';
import Swal from 'sweetalert2'
import { EditArticleComponent } from './edit-article/edit-article.component';

@Injectable({
  providedIn: 'root'
})
export class EditArticleGuard implements CanDeactivate<EditArticleComponent> {
  canDeactivate(
    component: EditArticleComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (component.formArt.dirty && !component.isSubmit) {
        return Swal.fire({
          icon: 'question',
          title: 'The form has not been submitted yet, do you really want to leave page?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#fa6342',
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            return true 
          } else {
            return false
          }
        })
    } else {
      return true;
    }
  }
}
