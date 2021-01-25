import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeachComponent } from './teach/teach.component';


const routes: Routes = [
    {
        path: '',
        component: TeachComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeachRoleRoutingModule { }
