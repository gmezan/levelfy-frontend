import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './levelfy/home/home.component';
import { UsComponent } from './levelfy/us/us.component';
import { ServicesComponent } from './levelfy/services/services.component';
import { GeneralServiceComponent } from './levelfy-services/general-service/general-service.component';
import { ClientServiceFormComponent } from './levelfy-services/client-service-form/client-service-form.component';
import { BlogComponent } from './levelfy/blog/blog.component';
import { LoginComponent } from './levelfy/login/login.component';

/*
More specific paths should be first
 */

const routes: Routes = [
    // List services navigation (no login required)
    {
        path: 'services/:type/form',
        component: ClientServiceFormComponent,
        pathMatch: 'full',
    },
    {
        path: 'services/:type',
        component: GeneralServiceComponent,
        pathMatch: 'full',
    },

    // Main navigation (NavBar)
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'service', component: ServicesComponent, pathMatch: 'full' },
    { path: 'blog', component: BlogComponent, pathMatch: 'full' },
    { path: 'us', component: UsComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'signup', component: UsComponent, pathMatch: 'full' },

    // Error Handler 404
    { path: '**', component: UsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false,
        }),
    ],
    exports: [],
})
export class AppRoutingModule {}
