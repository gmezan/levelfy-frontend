import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'app/shared/header/header.component';
import { MenuServicesComponent } from './menu-services/menu-services.component';
import { CourseCardComponent } from './course-card/course-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuServicesComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
