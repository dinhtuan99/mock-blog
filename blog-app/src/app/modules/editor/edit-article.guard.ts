import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewArticleComponent } from './new-article/new-article.component';

@Injectable({
  providedIn: 'root'
})
export class EditArticleGuard implements CanDeactivate<NewArticleComponent> {
  canDeactivate(
    component: NewArticleComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.formArt.dirty) {
      if (confirm("Are you sure?")) {
        return true;
      } else {
        return false
      }
    }
    return true;
  }
}
