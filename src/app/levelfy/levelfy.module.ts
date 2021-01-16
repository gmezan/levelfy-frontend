import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';

import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [HomeComponent, UsComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        NgbModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        NouisliderModule,
        CoreModule,
    ],
})
export class LevelfyModule {}
