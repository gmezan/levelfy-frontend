import { Component, ComponentFactoryResolver, ElementRef, OnInit } from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Service } from '../../../shared/_models/service.model';
import { AuthService } from '../../../core/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { UserService } from '../../../core/services/user.service';

const path = '/m/services';

const modalStrings = {
  create: { title: 'Create Service', submit: 'Create', cancel: 'Cancel' },
  edit: { title: 'Edit Service', submit: 'Save', cancel: 'Cancel' },
  delete: { title: 'Delete Service', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
  create: {
    success: 'Service created successfully',
    error: 'There was an error creating this course, try again later',
  },
  edit: {
    success: 'Service edited successfully',
    error: 'There was an error updating this course, try again later',
  },
  delete: {
    success: 'Service deleted correctly',
    error: 'There was an error deleting this Service, try again later',
  },
  image: {
    success: 'Image uploaded correctly',
    error: 'There was an error uploading the image, try again later',
  },
};

const searchBarSelector = '.teacherFulName';

@Component({
  selector: 'app-services2',
  templateUrl: './services2.component.html',
  styleUrls: ['./services2.component.css']
})
export class Services2Component
    extends ModalCrudComponent<Service>
    implements OnInit {

  title2: string;
  servicesSelector=[];
  availableSelector=[];
  serviceeee = null;
  constructor(
      private authService: AuthService,
      protected router: Router,
      private route: ActivatedRoute,
      private serviceService: ServiceService,
      protected elementRef: ElementRef,
      private fb: FormBuilder,
      private componentFactoryResolver: ComponentFactoryResolver,
      private courseService: CourseService,
      private userService: UserService
  ) {
    super(
        serviceService,
        modalStrings,
        new Service(),
        searchBarSelector,
        elementRef,
        router,
        path
    );
    this.servicesSelector = ['A','A2'];
    this.availableSelector = ['B','B2','B3','B4','A3','A4'];
    this.title2 = 'AEA';
  }

  ngOnInit(): void {
    console.log(this.resource?.price);
    console.log(this.serviceeee)
  }

  protected createAlert(isSuccess: boolean, message: string) {
  }

  fillModal() {
    return undefined;
  }

  getId(resource: Service): string {
    return '';
  }

  onSubmitModalForm(resource: Service, index: number, id: string): void {
  }

}
