import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';

import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { SectionIconsComponent } from './home/section-icons/section-icons.component';
import { SectionCarouselComponent } from './home/section-carousel/section-carousel.component';
import { SectionUniversitiesComponent } from './home/section-universities/section-universities.component';
import { SectionNumbersComponent } from './home/section-numbers/section-numbers.component';
import { SectionTestimonialComponent } from './home/section-testimonial/section-testimonial.component';
import { SectionBlogComponent } from './home/section-blog/section-blog.component';
import { SectionPartnersComponent } from './home/section-partners/section-partners.component';

@NgModule({
    declarations: [
        HomeComponent,
        UsComponent,
        BlogComponent,
        LoginComponent,
        SectionIconsComponent,
        SectionCarouselComponent,
        SectionUniversitiesComponent,
        SectionNumbersComponent,
        SectionTestimonialComponent,
        SectionBlogComponent,
        SectionPartnersComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule,
        CoreModule,
        FontAwesomeModule,
    ],
})
export class LevelfyModule {}
