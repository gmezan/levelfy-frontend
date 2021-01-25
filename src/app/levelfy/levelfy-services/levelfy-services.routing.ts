import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ClientServiceFormComponent } from './client-service-form/client-service-form.component';
import { GeneralServiceComponent } from './general-service/general-service.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';




const routes: Routes = [
    // List services navigation (no login required)
    {
        path: ':type/form',
        component: ClientServiceFormComponent,
        pathMatch: 'full',
    },
    {
        path: ':type',
        component: GeneralServiceComponent,
        pathMatch: 'full',
    },
    {
        path: '',
        component: ServicesComponent,
        pathMatch: 'full',
    }

];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LevelfyServicesRoutingModule { }
