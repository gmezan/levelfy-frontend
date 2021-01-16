import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user.service';
import { CourseService } from './service/course.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [UserService, CourseService],
})
export class CoreModule {}
