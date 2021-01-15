import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from 'app/shared/header/header.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        SharedModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,

    ]
})
export class ExamplesModule { }
