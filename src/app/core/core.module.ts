import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';
import { TestimonialService } from './services/testimonial.service';
import { CourseSuggestionService } from './services/course-suggestion.service';
import { ServiceService } from './services/service.service';
import { AuthService } from './security/auth.service';
import { AdminAuthGuard } from './auth-guards/admin-auth-guard.service';
import { TeachAuthGuard } from './auth-guards/teach-auth-guard.service';
import { ClientAuthGuard } from './auth-guards/client-auth-guard.service';
import { AnonAuthGuard } from './auth-guards/anon-auth-guard.service';
import { TokenService } from './security/token.service';
import { OauthService } from './security/oauth.service';
import { HttpClientModule } from '@angular/common/http';
import { resourceInterceptor } from './interceptors/resource.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ModAuthGuard } from './auth-guards/mod-auth-guard.service';
import { EnrollmentService } from './services/enrollment.service';
import { SaleCanceledService } from './services/sale-canceled.service';
import { SaleService } from './services/sale.service';
import { NavbarPageComponent } from './common/navbar-page/navbar-page.component';

@NgModule({
    declarations: [NavbarPageComponent],
    imports: [CommonModule, HttpClientModule],
    providers: [
        UserService,
        CourseService,
        TestimonialService,
        CourseSuggestionService,
        ServiceService,
        EnrollmentService,
        SaleCanceledService,
        SaleService,
        AuthService,
        AdminAuthGuard,
        ModAuthGuard,
        TeachAuthGuard,
        ClientAuthGuard,
        AnonAuthGuard,

        TokenService,
        OauthService,
        ReactiveFormsModule,
    ],
})
export class CoreModule {}
