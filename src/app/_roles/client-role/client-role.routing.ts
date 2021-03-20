import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { MyEnrollmentsComponent } from './my-enrollments/my-enrollments.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        pathMatch: 'full',
    },
    {
        path: 'courses',
        component: MyEnrollmentsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoleRoutingModule {}
