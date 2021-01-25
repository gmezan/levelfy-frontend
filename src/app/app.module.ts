import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CoreModule } from './core/core.module';
import { LevelfyModule } from './levelfy/levelfy.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LevelfyServicesModule } from './levelfy/levelfy-services/levelfy-services.module';
import { MyErrorHandler } from './core/common/app-error-handler';
import { AdminRoleModule } from './_roles/admin-role/admin-role.module';
import { TeachRoleModule } from './_roles/teach-role/teach-role.module';
import { ClientRoleModule } from './_roles/client-role/client-role.module';

// Social Login
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angularx-social-login';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        AppRoutingModule,
        CoreModule,
        LevelfyModule,
        LevelfyServicesModule,
        HttpClientModule,

        AdminRoleModule,
        TeachRoleModule,
        ClientRoleModule,
        SharedModule,

        SocialLoginModule,
    ],
    providers: [
        { provide: ErrorHandler, useClass: MyErrorHandler },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '50340193168-296shkdcb8ossqrgh769vuqqh8pr58mm.apps.googleusercontent.com'
                        ),
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('433412491137225'),
                    },
                ],
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
    }
}
