import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModComponent } from './mod/mod.component';
import { ModRoleRoutingModule } from './mod-role.routing';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services/services.component';
import { Services2Component } from './services2/services2.component';



@NgModule({
  declarations: [ModComponent, CoursesComponent, UsersComponent, ServicesComponent, Services2Component],
  imports: [
    CommonModule,
    ModRoleRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class ModRoleModule { }
