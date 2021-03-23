import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientRoleRoutingModule } from './client-role.routing';
import { MyEnrollmentsComponent } from './my-enrollments/my-enrollments.component';
import { SharedModule } from '../../shared/shared.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        ClientComponent,
        MyEnrollmentsComponent,
        EnrollmentComponent,
    ],
    imports: [
        CommonModule,
        ClientRoleRoutingModule,
        SharedModule,
        FontAwesomeModule,
    ],
})
export class ClientRoleModule {}
