import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './_examples/signup/signup.component';
import { LandingComponent } from './_examples/landing/landing.component';
import { NucleoiconsComponent } from './_components/nucleoicons/nucleoicons.component';
import { HomeComponent } from './levelfy/home/home.component';
import { UsComponent } from './levelfy/us/us.component';
import { ServicesComponent } from './levelfy/services/services.component';

/*
More specific paths should be first
 */

const routes: Routes = [
    // Main navigation
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'service', component: ServicesComponent, pathMatch: 'full' },
    { path: 'blog', component: UsComponent, pathMatch: 'full' },
    { path: 'us', component: UsComponent, pathMatch: 'full' },

    { path: 'signup', component: SignupComponent, pathMatch: 'full' },
    { path: 'landing', component: LandingComponent, pathMatch: 'full' },
    { path: '**', component: NucleoiconsComponent },
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
