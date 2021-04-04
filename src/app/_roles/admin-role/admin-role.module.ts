import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoleRoutingModule } from './admin-role.routing';
import { SharedModule } from '../../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SalesComponent } from './sales/sales.component';
import { SaleCanceledComponent } from './sale-canceled/sale-canceled.component';
import { ServiceComponent } from './services/service/service.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
    declarations: [
        AdminComponent,
        CoursesComponent,
        UsersComponent,
        ServicesComponent,
        EnrollmentComponent,
        SalesComponent,
        SaleCanceledComponent,
        ServiceComponent,
    ],
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        MatPaginatorModule,
    ],
})
export class AdminRoleModule {}
