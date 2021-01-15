import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './_components/components.component';
import { ProfileComponent } from './_examples/profile/profile.component';
import { SignupComponent } from './_examples/signup/signup.component';
import { LandingComponent } from './_examples/landing/landing.component';
import { NucleoiconsComponent } from './_components/nucleoicons/nucleoicons.component';
import { HomeComponent } from './levelfy/home/home.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: HomeComponent, pathMatch: 'full' },
    { path: 'user-profile',     component: ProfileComponent, pathMatch: 'full' },
    { path: 'signup',           component: SignupComponent, pathMatch: 'full' },
    { path: 'landing',          component: LandingComponent, pathMatch: 'full' },
    { path: 'nucleoicons',      component: NucleoiconsComponent, pathMatch: 'full' },
    { path: '**',               component: NucleoiconsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
