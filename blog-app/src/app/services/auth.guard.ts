import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.currentUserValue() != null) {
      return true;
    }
    else {
      return Swal.fire({
        icon: 'warning',
        title: 'You need to login first!!!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#fa6342',
      }).then((result) => {
        this.router.navigate(['../', 'login'])
        return true
      }
      )
    }
  }
}
