import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientRoleRoutingModule } from './client-role.routing';
import { MyEnrollmentsComponent } from './my-enrollments/my-enrollments.component';

@NgModule({
    declarations: [ClientComponent, MyEnrollmentsComponent],
    imports: [CommonModule, ClientRoleRoutingModule],
})
export class ClientRoleModule {}
