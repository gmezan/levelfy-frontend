import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseSuggestionComponent } from './course-suggestion/course-suggestion.component';
import { CoreModule } from '../core/core.module';
import { GeneralServiceComponent } from './general-service/general-service.component';
import { ClientServiceFormComponent } from './client-service-form/client-service-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceFormComponent } from './client-service-form/service-form/service-form.component';
import { AsesPerComponent } from './client-service-form/service-form/ases-per/ases-per.component';
import { AsesPaqComponent } from './client-service-form/service-form/ases-paq/ases-paq.component';
import { MarComponent } from './client-service-form/service-form/mar/mar.component';

@NgModule({
    declarations: [
        CourseSuggestionComponent,
        GeneralServiceComponent,
        ClientServiceFormComponent,
        ServiceFormComponent,
        AsesPerComponent,
        AsesPaqComponent,
        MarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        FontAwesomeModule,
        RouterModule,
    ],
})
export class LevelfyServicesModule {}
