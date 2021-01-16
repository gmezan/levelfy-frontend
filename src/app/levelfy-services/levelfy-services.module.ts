import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsesPaqComponent } from './ases-paq/ases-paq.component';
import { AsesPerComponent } from './ases-per/ases-per.component';
import { CourseSuggestionComponent } from './course-suggestion/course-suggestion.component';
import { MarathonComponent } from './marathon/marathon.component';


@NgModule({
  declarations: [
    AsesPaqComponent,
    AsesPerComponent,
    CourseSuggestionComponent,
    MarathonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
    RouterModule,
    JwBootstrapSwitchNg2Module
  ]
})
export class LevelfyServicesModule { }
