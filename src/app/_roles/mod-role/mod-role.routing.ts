import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModComponent } from './mod/mod.component';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { Services2Component } from './services2/services2.component';


const routes: Routes = [
    {
        path: '',
        component: ModComponent,
        pathMatch: 'full',
    },
    {
        path: 'courses',
        component: CoursesComponent,
        pathMatch: 'full',
    },
    {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
    },
    {
        path: 'services',
        component: ServicesComponent,
        pathMatch: 'full',
    },
    {
        path: 'services2',
        component: Services2Component,
        pathMatch: 'full',
    },

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModRoleRoutingModule { }
