import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoleRoutingModule } from './admin-role.routing';
import { SharedModule } from '../../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AdminComponent, CoursesComponent],
    imports: [
        CommonModule,
        AdminRoleRoutingModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
})
export class AdminRoleModule {}
