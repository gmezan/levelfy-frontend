import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModComponent } from './mod/mod.component';
import { ModRoleRoutingModule } from './mod-role.routing';



@NgModule({
  declarations: [ModComponent],
  imports: [
    CommonModule, ModRoleRoutingModule
  ]
})
export class ModRoleModule { }
