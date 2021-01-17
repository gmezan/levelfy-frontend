import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './_examples/signup/signup.component';
import { HomeComponent } from './levelfy/home/home.component';
import { UsComponent } from './levelfy/us/us.component';
import { ServicesComponent } from './levelfy/services/services.component';
import { ComponentsComponent } from './_components/components.component';
import { GeneralServiceComponent } from './levelfy-services/general-service/general-service.component';

/*
More specific paths should be first
 */

const routes: Routes = [
    // List services navigation (no login required)
    {
        path: 'service/:type/:courseId',
        component: GeneralServiceComponent,
        pathMatch: 'full',
    },
    {
        path: 'service/:type',
        component: GeneralServiceComponent,
        pathMatch: 'full',
    },

    // Main navigation (NavBar)
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'service', component: ServicesComponent, pathMatch: 'full' },
    { path: 'blog', component: UsComponent, pathMatch: 'full' },
    { path: 'us', component: UsComponent, pathMatch: 'full' },
    { path: 'signup', component: SignupComponent, pathMatch: 'full' },

    // Error Handler 404
    { path: '**', component: ComponentsComponent },
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
