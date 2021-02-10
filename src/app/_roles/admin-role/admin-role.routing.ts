import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
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
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoleRoutingModule {}
