import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientRoleRoutingModule } from './client-role.routing';



@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
      ClientRoleRoutingModule
  ]
})
export class ClientRoleModule { }
