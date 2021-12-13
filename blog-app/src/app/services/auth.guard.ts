import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginDialogComponent } from '../shared/dialog/login-dialog/login-dialog.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private modalService: BsModalService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.currentUser().pipe(take(1), map(user => {
      if (user != null) {
        return true;
      }
      else {
        const subject: Subject<boolean> = new Subject<boolean>();
        const modal: any = this.modalService.show(LoginDialogComponent, { 'class': 'modal-dialog-primary' });
        modal.content.subject = subject
        this.router.navigate(['login'])
        return false;
      }
    }));


  }
}
