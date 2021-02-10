import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { User } from '../../../shared/_models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { Roles } from '../../../core/util/roles.data';

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

  constructor(
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
        elementRef);
    this.form = this.fillModal();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resources = [];
      this.title = 'Personas: ' + (Roles[params.r - 1] || 'Moderadores') + ' - ' +
                   'Universidad: ' + (params.u || 'PUCP') ;
      let options = params.u ? {u: params.u, r: params.r} : null;
      this.userService
          .getAll(options)
          .subscribe((data) => {
            this.resources = data;
            console.log(data[0]);
            console.log(data);
          });
    });
  }

  fillModal() {
    return this.fb.group({
      idUser: [this.resource.idUser],
      email: [this.resource.email, Validators.compose([Validators.email,Validators.required])],
      phone : [this.resource.phone],
      balance : [this.resource.balance],
      code : [this.resource.code],
      name : [this.resource.name, Validators.required],
      lastname : [this.resource.lastname],
      active : [this.resource.active],
      university : [this.resource.university],
      coupon : [this.resource.coupon]
    });
  }

  getId(user: User): string {
    return user.idUser.toString();
  }

  onSubmitModalForm(resource: User, index, id) {
    if (this.modal.isDelete)
      this.dataService.delete(id).subscribe(
          (data) => {
            this.deleteResourceAt(index);
            this.createAlertSuccess(messagesAlert.delete.success);
          },
          (error) => {
            this.createAlertError(messagesAlert.delete.error);
            console.log(error);
          }
      );
    else if (this.modal.isCreate)
      this.dataService.create(resource).subscribe(
          (data) => {
            let originalLastIndex = this.resources.length - 1;
            this.addResourceAt(originalLastIndex, data);
            this.createAlertSuccess(messagesAlert.create.success);
          },
          (error) => {
            this.createAlertError(messagesAlert.create.error);
            console.log(error);
          }
      );
    else if (this.modal.isEdit)
      this.dataService.update(resource).subscribe(
          (data) => {
            // Replace the Data with the data updated
            data.created = this.resources[index].created; //bug
            this.replaceResourceAt(index, data);
            this.createAlertSuccess(messagesAlert.edit.success);
          },
          (error) => {
            this.createAlertError(messagesAlert.edit.error);
            console.log(error);
          }
      );
  }

  key(event) {
    console.log(event);
    event.preventDefault();
  }

  private createAlertSuccess(message: string) {
    this.createAlert(true, message);
  }

  private createAlertError(message: string) {
    this.createAlert(false, message);
  }

  private createAlert(isSuccess: boolean, message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        CustomAlertComponent
    );

    const viewContainerRef = this.alertDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<CustomAlertComponent>(
        componentFactory
    );
    componentRef.instance.isSuccess = isSuccess;
    componentRef.instance.message = message;
  }

}
