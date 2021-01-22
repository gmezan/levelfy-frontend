import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';
import { TestimonialService } from './services/testimonial.service';
import { CourseSuggestionService } from './services/course-suggestion.service';
import { ServiceService } from './services/service.service';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        UserService,
        CourseService,
        TestimonialService,
        CourseSuggestionService,
        ServiceService,
        AuthService,
    ],
})
export class CoreModule {}
