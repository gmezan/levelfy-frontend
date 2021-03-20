import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseSuggestionComponent } from './course-suggestion/course-suggestion.component';
import { GeneralServiceComponent } from './general-service/general-service.component';
import { ClientServiceFormComponent } from './client-service-form/client-service-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsesPerComponent } from './client-service-form/ases-per/ases-per.component';
import { AsesPaqComponent } from './client-service-form/ases-paq/ases-paq.component';
import { MarComponent } from './client-service-form/mar/mar.component';
import { ServicesComponent } from './services/services.component';
import { LevelfyServicesRoutingModule } from './levelfy-services.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        CourseSuggestionComponent,
        GeneralServiceComponent,
        ClientServiceFormComponent,
        AsesPerComponent,
        AsesPaqComponent,
        MarComponent,
        ServicesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule,
        LevelfyServicesRoutingModule,
        MatButtonModule,
        MatMenuModule,
    ],
    bootstrap: [],
})
export class LevelfyServicesModule {}
