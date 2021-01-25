import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModComponent } from './mod/mod.component';


const routes: Routes = [
    {
        path: '',
        component: ModComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModRoleRoutingModule { }
