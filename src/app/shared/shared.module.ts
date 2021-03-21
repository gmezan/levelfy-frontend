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
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule],
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
    ],
})
export class SharedModule {}
