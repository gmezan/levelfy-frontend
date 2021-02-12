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
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { Roles } from '../../../core/util/roles.data';

const path = '/a/users';

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
    rolesSelector: string[];
    universitiesSelector: string[];

    constructor(
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
        this.universitiesSelector.splice(0, 0, 'All');

        this.rolesSelector = [];
        this.roles.forEach((r) => {
            if (r != 'admin') this.rolesSelector.push(r);
        });
        this.rolesSelector.splice(0, 0, 'All');
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Rol: ';
            this.title2 = 'Universidad: ';

            let queryParams;
            if (params.u && params.r)
                queryParams = { u: params.u, r: params.r };
            else if (params.u) queryParams = { u: params.u };
            else if (params.r) queryParams = { r: params.r };
            else queryParams = null;

            //console.log('Routing to: ', queryParams);
            this.userService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.resourcesSliced = this.resources.slice(
                    (this.pageNumber - 1) * this.pageSize,
                    this.pageNumber * this.pageSize
                );
            });
        });
    }

    onUnivOptionsSelected(value: string) {
        let queryParams = value != null ? { u: value } : null;
        console.log(queryParams);
        this.router.navigate([path], { queryParams: queryParams });
    }

    onRolOptionsSelected(value: string) {
        let queryParams = value != null ? { r: Roles[value] } : null;
        console.log(queryParams);
        this.router.navigate([path], { queryParams: queryParams });
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

    onOptionsSelected(univ: string, role: string) {
        if (!this.universitiesSelector.includes(univ) || univ === 'All')
            univ = null;
        if (!this.rolesSelector.includes(role) || role === 'All') role = null;

        let queryParams = { u: univ, r: role };

        this.router.navigate([this.path], {
            queryParams: queryParams,
        });
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
