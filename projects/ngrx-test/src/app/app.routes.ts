import { Routes } from '@angular/router';
import { accessGuard } from './shared/guards/access.guard';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
        canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component'),
        canActivate: [authGuard]
    },
    {
        path: 'list',
        loadComponent: () => import('./list/list.component'),
        canActivate: [accessGuard]
    },
    { path: '', pathMatch: 'full', redirectTo: 'list' },
];
