import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'app/shared/header/header.component';
import { MenuServicesComponent } from './menu-services/menu-services.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        MenuServicesComponent,
        CourseCardComponent,
        TestimonialComponent,
    ],
    imports: [CommonModule, FontAwesomeModule, RouterModule],
    exports: [
        HeaderComponent,
        TestimonialComponent,
        MenuServicesComponent,
        CourseCardComponent,
    ],
})
export class SharedModule {}
