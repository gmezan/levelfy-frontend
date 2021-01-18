import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user.service';
import { CourseService } from './service/course.service';
import { TestimonialService } from './service/testimonial.service';
import { CourseSuggestionService } from './service/course-suggestion.service';
import { ServiceService } from './service/service.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        UserService,
        CourseService,
        TestimonialService,
        CourseSuggestionService,
        ServiceService,
    ],
})
export class CoreModule {}
