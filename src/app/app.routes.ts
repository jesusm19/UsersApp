import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form';
import { UserGridComponent } from './components/user-grid/user-grid';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path:'users' , component: UserGridComponent
    },
    {
        path:'users/page/:page' , component: UserGridComponent
    },
    {
        path:'users/create', 
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path:'users/edit/:id', 
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: '', redirectTo: '/users/page/0', pathMatch: 'full' 
    },
    {
        path: 'login', component: LoginComponent
    }
];
