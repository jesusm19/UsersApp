import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form';
import { UserGridComponent } from './components/user-child/user-grid';

export const routes: Routes = [
    {
        path:'users' , component: UserGridComponent
    },
    {
        path:'users/create', component: UserFormComponent
    },
    {
        path:'users/edit', component: UserFormComponent
    },
    {
        path: '', redirectTo: '/users', pathMatch: 'full' 
    },
];
