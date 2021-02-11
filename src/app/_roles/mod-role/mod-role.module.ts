import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModComponent } from './mod/mod.component';
import { ModRoleRoutingModule } from './mod-role.routing';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [ModComponent, CoursesComponent, UsersComponent],
  imports: [
    CommonModule, ModRoleRoutingModule
  ]
})
export class ModRoleModule { }
