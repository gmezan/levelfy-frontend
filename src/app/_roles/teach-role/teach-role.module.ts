import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachComponent } from './teach/teach.component';
import { TeachRoleRoutingModule } from './teach-role.routing';
import { ServicesComponent } from './services/services.component';
import { CoursesComponent } from './courses/courses.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoleRoutingModule } from '../admin-role/admin-role.routing';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [TeachComponent, ServicesComponent, CoursesComponent],
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        TeachRoleRoutingModule,
    ],
})
export class TeachRoleModule {}
