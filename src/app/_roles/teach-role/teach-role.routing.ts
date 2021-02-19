import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeachComponent } from './teach/teach.component';
import { ServicesComponent } from './services/services.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
    {
        path: '',
        component: TeachComponent,
        pathMatch: 'full',
    },
    {
        path: 'courses',
        component: CoursesComponent,
        pathMatch: 'full',
    },
    {
        path: 'services',
        component: ServicesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeachRoleRoutingModule {}
