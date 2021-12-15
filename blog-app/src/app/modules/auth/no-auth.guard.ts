import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private userService: UserService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.currentUserValue() == null) return true;
    else {
      return Swal.fire({
        icon: 'warning',
        title: 'You are logged in!!!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#fa6342',
      }).then((result) => {
        this.router.navigate([''])
        return true
      })
    }
  }

}
