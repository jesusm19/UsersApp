import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form';
import { UserGridComponent } from './components/user-grid/user-grid';

export const routes: Routes = [
    {
        path:'users' , component: UserGridComponent
    },
    {
        path:'users/page/:page' , component: UserGridComponent
    },
    {
        path:'users/create', component: UserFormComponent
    },
    {
        path:'users/edit/:id', component: UserFormComponent
    },
    {
        path: '', redirectTo: '/users/page/0', pathMatch: 'full' 
    },
];
