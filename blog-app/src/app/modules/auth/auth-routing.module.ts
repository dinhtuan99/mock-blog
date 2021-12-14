import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth.guard';
import { RegisterComponent } from './register/register.component';
import { SettingGuard } from './setting.guard';
import { SettingsComponent } from './settings/settings.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NoAuthGuard]
    }
    ,
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        canDeactivate: [SettingGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
