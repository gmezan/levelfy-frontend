import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { MyEnrollmentsComponent } from './my-enrollments/my-enrollments.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

const routes: Routes = [
    {
        path: '',
        component: MyEnrollmentsComponent,
        pathMatch: 'full',
    },
    {
        path: 'enrollment',
        component: MyEnrollmentsComponent,
        pathMatch: 'full',
    },
    {
        path: 'enrollment/:id',
        component: EnrollmentComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoleRoutingModule {}
