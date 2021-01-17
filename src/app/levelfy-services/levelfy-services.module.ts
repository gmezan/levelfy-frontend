import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseSuggestionComponent } from './course-suggestion/course-suggestion.component';
import { CoreModule } from '../core/core.module';
import { GeneralServiceComponent } from './general-service/general-service.component';

@NgModule({
    declarations: [CourseSuggestionComponent, GeneralServiceComponent],
    imports: [CommonModule, FormsModule, NgbModule, SharedModule],
})
export class LevelfyServicesModule {}
