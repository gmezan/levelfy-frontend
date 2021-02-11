import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { User } from '../../../shared/_models/user.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';

const path = '/m/users'

const queryParams = {u: 'PUCP', r: 'ADMIN'}

const modalStrings = {
  create: { title: 'Create User', submit: 'Create User', cancel: 'Cancel' },
  edit: { title: 'Edit User', submit: 'Save', cancel: 'Cancel' },
  delete: { title: 'Delete User', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
  create: {
    success: 'User created successfully',
    error: 'There was an error creating this course, try again later',
  },
  edit: {
    success: 'User edited successfully',
    error: 'There was an error updating this course, try again later',
  },
  delete: {
    success: 'User deleted correctly',
    error: 'There was an error deleting this course, try again later',
  },
  image: {
    success: 'Image uploaded correctly',
    error: 'There was an error uploading the image, try again later',
  },
};

const searchBarSelector = '.fullName';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent
    extends ModalCrudComponent<User>
    implements OnInit {

  @ViewChild(CustomAlertDirective, { static: true })
  alertDirective: CustomAlertDirective;

  // variables used to find users by role and university
  queryParams = queryParams;
  rolesSelector: string[];
  universitiesSelector: string[];
  title2: string;

  constructor(
      protected router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private userService: UserService,
      protected elementRef: ElementRef,
      private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(userService,
        modalStrings,
        new User(),
        searchBarSelector,
        elementRef,
        router,
        path);
    this.form= this.fillModal();
    this.universitiesSelector = [];
    this.universities.forEach( u => {
      this.universitiesSelector.push(u);
    })
    this.rolesSelector = [];
    this.roles.forEach( u => {
      this.rolesSelector.push(u);
    })
    this.rolesSelector.splice(2,2);
  }

  ngOnInit(): void {
  }

  protected createAlert(isSuccess: boolean, message: string) {
  }

  fillModal() {
    return undefined;
  }

  getId(resource: User): string {
    return '';
  }

  onSubmitModalForm(resource: User, index: number, id: string): void {
  }

}
