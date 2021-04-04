import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SalesComponent } from './sales/sales.component';
import { SaleCanceledComponent } from './sale-canceled/sale-canceled.component';
import { ServiceComponent } from './services/service/service.component';

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
        pathMatch: 'full',
    },
    {
        path: 'services',
        component: ServicesComponent,
        pathMatch: 'full',
    },
    {
        path: 'service/:id',
        component: ServiceComponent,
        pathMatch: 'full',
    },
    {
        path: 'enrollments',
        component: EnrollmentComponent,
        pathMatch: 'full',
    },
    {
        path: 'sales',
        component: SalesComponent,
        pathMatch: 'full',
    },
    {
        path: 'canceled-sales',
        component: SaleCanceledComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoleRoutingModule {}
