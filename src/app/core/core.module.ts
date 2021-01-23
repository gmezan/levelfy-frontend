import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';
import { TestimonialService } from './services/testimonial.service';
import { CourseSuggestionService } from './services/course-suggestion.service';
import { ServiceService } from './services/service.service';
import { AuthService } from './common/auth.service';
import { AdminAuthGuard } from './auth-guards/admin-auth-guard.service';
import { TeachAuthGuard } from './auth-guards/teach-auth-guard.service';
import { ClientAuthGuard } from './auth-guards/client-auth-guard.service';

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
        AdminAuthGuard,
        TeachAuthGuard,
        ClientAuthGuard,
    ],
})
export class CoreModule {}
