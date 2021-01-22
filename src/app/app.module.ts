import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { NavbarComponent } from './app-components/navbar/navbar.component';
import { FooterComponent } from './app-components/footer/footer.component';
import { CoreModule } from './core/core.module';
import { LevelfyModule } from './levelfy/levelfy.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LevelfyServicesModule } from './levelfy-services/levelfy-services.module';
import { MyErrorHandler } from './core/common/app-error-handler';

@NgModule({
    declarations: [AppComponent, NavbarComponent, FooterComponent],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        AppRoutingModule,
        CoreModule,
        LevelfyModule,
        LevelfyServicesModule,
        HttpClientModule,
    ],
    providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
    }
}
