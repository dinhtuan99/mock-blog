import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { SettingsComponent } from './settings/settings.component';

@Injectable({
  providedIn: 'root'
})
export class SettingGuard implements CanDeactivate<SettingsComponent> {
  canDeactivate(
    component: SettingsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (component.settingsForm.dirty && !component.isSubmit) {
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
