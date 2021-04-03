import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'app/shared/header/header.component';
import { MenuServicesComponent } from './menu-services/menu-services.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarAnonComponent } from './navbar/navbar-anon/navbar-anon.component';
import { NavbarAdminComponent } from './navbar/navbar-admin/navbar-admin.component';
import { NavbarClientComponent } from './navbar/navbar-client/navbar-client.component';
import { NavbarTeachComponent } from './navbar/navbar-teach/navbar-teach.component';
import { NavbarModComponent } from './navbar/navbar-mod/navbar-mod.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { CustomAlertDirective } from './custom-alert/custom-alert.directive';
import { UniversityStringPipe } from './pipes/university-string.pipe';
import { TeachInfoCardComponent } from './teach-info-card/teach-info-card.component';
import { ServiceTypeStringPipe } from './pipes/service-type-string.pipe';
import { EvaluationStringPipe } from './pipes/evaluation-string.pipe';
import { PriceTagStringPipe } from './pipes/price-tag-string.pipe';
import { ForumComponent } from './forum/forum.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumDirective } from './forum/forum.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        HeaderComponent,
        MenuServicesComponent,
        CourseCardComponent,
        TestimonialComponent,
        NavbarComponent,
        FooterComponent,
        NavbarAnonComponent,
        NavbarAdminComponent,
        NavbarClientComponent,
        NavbarTeachComponent,
        NavbarModComponent,
        CustomAlertComponent,
        CustomAlertDirective,
        UniversityStringPipe,
        TeachInfoCardComponent,
        ServiceTypeStringPipe,
        EvaluationStringPipe,
        PriceTagStringPipe,
        ForumComponent,
        ForumDirective,
        DateAgoPipe,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [
        HeaderComponent,
        TestimonialComponent,
        MenuServicesComponent,
        CourseCardComponent,
        NavbarComponent,
        FooterComponent,
        CustomAlertDirective,
        UniversityStringPipe,
        TeachInfoCardComponent,
        ServiceTypeStringPipe,
        EvaluationStringPipe,
        PriceTagStringPipe,
        ForumComponent,
        ForumDirective,
    ],
})
export class SharedModule {}
