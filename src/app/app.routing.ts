import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './levelfy/home/home.component';
import { UsComponent } from './levelfy/us/us.component';
import { ServicesComponent } from './levelfy/levelfy-services/services/services.component';
import { GeneralServiceComponent } from './levelfy/levelfy-services/general-service/general-service.component';
import { ClientServiceFormComponent } from './levelfy/levelfy-services/client-service-form/client-service-form.component';
import { BlogComponent } from './levelfy/blog/blog.component';
import { LoginComponent } from './levelfy/login/login.component';
import { AdminComponent } from './_roles/admin-role/admin/admin.component';
import { AdminAuthGuard } from './core/auth-guards/admin-auth-guard.service';
import { TeachComponent } from './_roles/teach-role/teach/teach.component';
import { TeachAuthGuard } from './core/auth-guards/teach-auth-guard.service';
import { ClientComponent } from './_roles/client-role/client/client.component';
import { ClientAuthGuard } from './core/auth-guards/client-auth-guard.service';
import { ModComponent } from './_roles/mod-role/mod/mod.component';
import { ModAuthGuard } from './core/auth-guards/mod-auth-guard.service';
import { AnonAuthGuard } from './core/auth-guards/anon-auth-guard.service';

/*
More specific paths should be first
 */

const routes: Routes = [


    // Main navigation (NavBar)
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'services', loadChildren: () => import('./levelfy/levelfy-services/levelfy-services.module').then(m => m.LevelfyServicesModule) },
    { path: 'blog', component: BlogComponent, pathMatch: 'full' },
    { path: 'us', component: UsComponent, pathMatch: 'full' },

    { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [AnonAuthGuard] },
    { path: 'signup', component: UsComponent, pathMatch: 'full', canActivate: [AnonAuthGuard] },

    // Admin navigation
    {
        path: 'a',
        loadChildren: () => import('./_roles/admin-role/admin-role.module').then(m => m.AdminRoleModule),
        canActivate: [AdminAuthGuard],
    },
    {
        path: 'm',
        loadChildren: () => import('./_roles/mod-role/mod-role.module').then(m => m.ModRoleModule),
        canActivate: [ModAuthGuard],
    },
    {
        path: 't',
        loadChildren: () => import('./_roles/teach-role/teach-role.module').then(m => m.TeachRoleModule),
        canActivate: [TeachAuthGuard],
    },
    {
        path: 'c',
        loadChildren: () => import('./_roles/client-role/client-role.module').then(m => m.ClientRoleModule),
        canActivate: [ClientAuthGuard],
    },

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
