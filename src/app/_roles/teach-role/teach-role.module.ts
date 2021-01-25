import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachComponent } from './teach/teach.component';
import { TeachRoleRoutingModule } from './teach-role.routing';



@NgModule({
  declarations: [TeachComponent],
  imports: [
    CommonModule, TeachRoleRoutingModule
  ]
})
export class TeachRoleModule { }
