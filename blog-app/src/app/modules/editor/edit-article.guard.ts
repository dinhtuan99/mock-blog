import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/edit-dialog/dialog.component';
import { NewArticleComponent } from './new-article/new-article.component';

@Injectable({
  providedIn: 'root'
})
export class EditArticleGuard implements CanDeactivate<NewArticleComponent> {
  constructor(private modalService: BsModalService) {}
  canDeactivate(
    component: NewArticleComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (component.formArt.dirty) {
        const subject : Subject<boolean> = new Subject<boolean>();
        const modal : any = this.modalService.show(DialogComponent, { 'class': 'modal-dialog-primary' });
        modal.content.subject = subject
        return subject.asObservable();
    }
    return true;
  }
}
