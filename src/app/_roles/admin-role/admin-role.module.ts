import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoleRoutingModule } from './admin-role.routing';
import { SharedModule } from '../../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [AdminComponent, CoursesComponent, UsersComponent],
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
})
export class AdminRoleModule {}
