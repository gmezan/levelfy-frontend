import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { User } from '../../../shared/_models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { AuthService } from '../../../core/security/auth.service';
import { Roles } from '../../../core/util/roles.data';

const path = '/m/users';

const queryParams = { u: 'PUCP', r: 'ADMIN' };

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
    styleUrls: ['./users.component.css'],
})
export class UsersComponent extends ModalCrudComponent<User> implements OnInit {
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    // variables used to find users by role and university
    queryParams = queryParams;
    rolesSelector: string[];
    universitiesSelector: string[];
    title2: string;

    constructor(
        private authService: AuthService,
        protected router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userService: UserService,
        protected elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(
            userService,
            modalStrings,
            new User(),
            searchBarSelector,
            elementRef,
            router,
            path
        );
        this.form = this.fillModal();
        this.universitiesSelector = [];
        this.universities.forEach((u) => {
            this.universitiesSelector.push(u);
        });
        this.rolesSelector = [];
        this.roles.forEach((u) => {
            this.rolesSelector.push(u);
        });
        this.rolesSelector.splice(2, 2);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Rol : ';
            this.title2 = 'Universidad: ';
            console.log(this.authService.getCurrentUser());
            let options =
                params.u != null && params.r != null
                    ? {
                          u: this.authService.getCurrentUser().university,
                          r: params.r,
                      }
                    : {
                          u: this.authService.getCurrentUser().university,
                          r: Roles['ROLE_CLIENT'],
                      };
            this.userService.getAll(options).subscribe((data) => {
                this.resources = data;
                console.log(data);
                this.updateResourcesSliced();
            });
        });
    }

    fillModal() {
        return this.fb.group({
            idUser: [this.resource.idUser],
            email: [
                this.resource.email,
                Validators.compose([Validators.email, Validators.required]),
            ],
            phone: [this.resource.phone],
            balance: [this.resource.balance],
            code: [this.resource.code],
            name: [this.resource.name, Validators.required],
            lastname: [this.resource.lastname],
            active: [this.resource.active],
            university: [this.resource.university],
            coupon: [this.resource.coupon],
        });
    }

    getId(user: User): string {
        return user.idUser.toString();
    }

    onOptionsSelected(rol: string) {
        let queryParams =
            rol != null
                ? {
                      u: this.authService.getCurrentUser().university,
                      r: Roles[rol],
                  }
                : null;
        this.router.navigate([path], { queryParams: queryParams });
    }

    onSubmitModalForm(resource: User, index: number, id: string): void {
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

    protected createAlert(isSuccess: boolean, message: string) {
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
