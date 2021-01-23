import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';

import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { ServicesComponent } from './services/services.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        HomeComponent,
        UsComponent,
        ServicesComponent,
        BlogComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule,
        CoreModule,
        FontAwesomeModule,
    ],
})
export class LevelfyModule {}
