import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientRoleRoutingModule } from './client-role.routing';
import { MyEnrollmentsComponent } from './my-enrollments/my-enrollments.component';
import { SharedModule } from '../../shared/shared.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentInfoComponent } from './enrollment/payment-info/payment-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';

@NgModule({
    declarations: [
        ClientComponent,
        MyEnrollmentsComponent,
        EnrollmentComponent,
        PaymentInfoComponent,
        ClientRegistrationComponent,
    ],
    imports: [
        CommonModule,
        ClientRoleRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
})
export class ClientRoleModule {}
