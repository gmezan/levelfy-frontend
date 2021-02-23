import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Service } from '../../../shared/_models/service.model';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { Course } from '../../../shared/_models/course.model';
import { User } from '../../../shared/_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { UserService } from '../../../core/services/user.service';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { AuthService } from '../../../core/security/auth.service';
import { Roles } from '../../../core/util/roles.data';

const path = '/m/services';

const modalStrings = {
    create: { title: 'Create Service', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Edit Service', submit: 'Save', cancel: 'Cancel' },
    delete: { title: 'Delete Service', submit: 'Delete', cancel: 'Cancel' }
};

const messagesAlert = {
    create: {
        success: 'Service created successfully',
        error: 'There was an error creating this course, try again later'
    },
    edit: {
        success: 'Service edited successfully',
        error: 'There was an error updating this course, try again later'
    },
    delete: {
        success: 'Service deleted correctly',
        error: 'There was an error deleting this Service, try again later'
    },
    image: {
        success: 'Image uploaded correctly',
        error: 'There was an error uploading the image, try again later'
    }
};

const searchBarSelector = '.teacherFulName';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent
    extends ModalCrudComponent<Service>
    implements OnInit {
    // For Alert:
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    // variables used to find users by role and university
    servicesSelector: string[];
    university: string;
    universities: string[];

    // attributes for usages in the form
    courseSelector: Course[];
    userSelector: User[];
    availableSelector: string[];
    prices: any[];

    newArray: any[];

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
        this.form = this.fillModal();
        this.servicesSelector = [];
        this.services.forEach((s) => {
            this.servicesSelector.push(s.key);
            console.log(s.key);
        });
        this.servicesSelector.splice(0, 0, 'All');

        this.availableSelector = ['All', 'true', 'false'];
        console.log(this.servicesSelector, this.availableSelector);
    }

    ngOnInit(): void {
        this.university = this.authService.getCurrentUser().university || null;
        this.universities = [this.university];
        console.log(this.university);
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Service: ';
            this.title2 = 'Available: ';
            params = { u: this.university, s: params.s, a: params.a };
            let queryParams;
            if (params.u && params.s && params.a)
                queryParams = { u: params.u, s: params.s, a: params.a };
            else if (params.u && params.s)
                queryParams = { u: params.u, s: params.s };
            else if (params.u && params.a)
                queryParams = { u: params.u, a: params.a };
            else if (params.u) queryParams = { u: params.u };
            if (params.u) {
                console.log('Routing to: ', queryParams);
                this.serviceService.getAll(queryParams).subscribe((data) => {
                    this.resources = data;
                    this.resourcesSliced = this.resources.slice(
                        (this.pageNumber - 1) * this.pageSize,
                        this.pageNumber * this.pageSize
                    );
                });
            } else console.log(`Current user doesn't have an university!!`);
        });
        this.serviceService.getPrices().subscribe((data) => {
            this.prices = data;
        });
    }

    getId(resource: Service): string {
        return resource.idService.toString();
    }

    onOptionsSelected(service: string, available: string) {
        if (!this.university) return null;
        if (!this.servicesSelector.includes(service) || service === 'All')
            service = null;

        if (!this.availableSelector.includes(available) || available === 'All')
            available = null;

        let queryParams = { u: this.university, s: service, a: available };

        this.router.navigate([this.path], {
            queryParams: queryParams
        });
    }

    fillModal(): FormGroup {
        // Validations must be according to the database

        if (
            this.resource.course.courseId.university &&
            this.resource.course.courseId.idCourse
        ) {
            let queryParams = { u: this.resource.course.courseId.university };
            this.courseService
                .getAll(queryParams)
                .subscribe((data) => (this.courseSelector = data));
            this.userService
                .getAll({
                    u: this.resource.course.courseId.university,
                    r: Roles.teach,
                })
                .subscribe((data) => (this.userSelector = data));
        } else {
            this.courseSelector = [];
            this.userSelector = [];
        }

        let formSessionArray = [];
        this.resource.serviceSessionList?.forEach((sl) =>
            formSessionArray.push(
                new FormGroup({
                    date: new FormControl(sl.date, Validators.required),
                    start: new FormControl(sl.start, Validators.required),
                    end: new FormControl(sl.end, Validators.required),
                })
            )
        );

        let formAgendaArray = [];
        this.resource.serviceAgendaList?.forEach((sa) =>
            formAgendaArray.push(
                new FormGroup({
                    id: new FormControl(sa.id),
                    service: this.fb.group({
                        idService: [sa.service?.idService || 0],
                    }),
                    key: new FormControl(sa.key, Validators.required),
                    description: new FormControl(
                        sa.description,
                        Validators.required
                    ),
                })
            )
        );

        return this.fb.group({
            idService: [this.resource.idService],
            course: this.fb.group({
                courseId: this.fb.group({
                    idCourse: [
                        this.resource.course.courseId.idCourse,
                        Validators.required,
                    ],
                    university: [
                        this.resource.course.courseId.university,
                        Validators.required,
                    ],
                }),
            }),
            teacher: this.fb.group({
                idUser: [this.resource.teacher.idUser, Validators.required],
            }),
            available: [this.resource.available, Validators.required],
            serviceType: [this.resource.serviceType, Validators.required],
            price: [this.resource.price, Validators.required],
            evaluation: [this.resource.evaluation],
            description: [this.resource.description],
            expiration: [this.resource.expiration],
            archived: [this.resource.archived],
            photo: [this.resource.photo],
            serviceSessionList: new FormArray(formSessionArray),
            serviceAgendaList: new FormArray(formAgendaArray),
        });
    }

    modalCreate() {
        super.modalCreate();
    }

    onUniversitySelected(value: string) {
        this.courseService
            .getAll({ u: value })
            .subscribe((data) => {
                this.courseSelector = data;
                console.log('courses received');
                console.log(this.courseSelector);
            });
        this.userService
            .getAll({ u: value, r: Roles.teach })
            .subscribe((data) => {
                this.userSelector = data;
                console.log('users received');
                console.log(this.userSelector);
            });
        console.log('ASDASDAS');
        console.log(this.courseSelector);
        // For the price
        this.checkChangeForPrice();
    }

    get serviceAgendaList() {
        return this.form.get('serviceAgendaList') as FormArray;
    }

    get serviceSessionList() {
        return this.form.get('serviceSessionList') as FormArray;
    }
    get evaluation() {
        return this.form.get('evaluation').value;
    }
    get serviceType() {
        return this.form.get('serviceType').value;
    }

    checkChangeForPrice() {
        let price;
        console.log('SETTING PRICE');
        console.log(this.evaluation, this.serviceType, this.university);
        if (this.evaluation && this.serviceType && this.university) {
            if (this.prices) {
                let elementPrice: [] = this.prices[this.university][
                    this.serviceType
                    ];
                switch (this.serviceType) {
                    case 'ASES_PER':
                        let maxP = 0;
                        elementPrice.forEach((element) => {
                            if (element['price'] > maxP)
                                maxP = element['price'];
                        });
                        price = maxP;
                        break;

                    case 'ASES_PAQ':
                        elementPrice.forEach((element) => {
                            if (
                                (this.evaluation as string).includes(
                                    element['type']
                                )
                            ) {
                                price = element['price'];
                            }
                        });
                        break;

                    case 'MAR':
                        elementPrice.forEach((element) => {
                            price = element['price'];
                        });
                        break;
                }
            }
            if (this.modal.isCreate)
                this.form.controls.price.setValue(price || this.resource.price);
        }
    }

    addServiceAgenda() {
        this.serviceAgendaList.push(
            new FormGroup({
                id: new FormControl(0),
                service: this.fb.group({
                    idService: [this.form.get('idService').value],
                }),
                key: new FormControl('', Validators.required),
                description: new FormControl('', Validators.required),
            })
        );
    }

    deleteServiceAgenda() {
        this.serviceAgendaList.removeAt(this.serviceAgendaList.length - 1);
    }

    requiresAgenda(): boolean {
        return (
            this.form.get('serviceType').value == 'ASES_PAQ' ||
            this.form.get('serviceType').value == 'MAR'
        );
    }

    requiresSessions(): boolean {
        return (
            this.form.get('serviceType').value == 'ASES_PAQ' ||
            this.form.get('serviceType').value == 'MAR'
        );
    }

    addServiceSession() {
        this.serviceSessionList.push(
            new FormGroup({
                date: new FormControl('', Validators.required),
                start: new FormControl('', Validators.required),
                end: new FormControl('', Validators.required)
            })
        );
    }

    deleteServiceSession() {
        this.serviceSessionList.removeAt(this.serviceSessionList.length - 1);
    }

    onSubmitModalForm(resource: Service, index: number, id: string): void {
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
                    if (!this.modal.hasFile) return;
                    this.serviceService
                        .uploadImage(
                            data.idService.toString(),
                            this.obtainImageFormData()
                        )
                        .subscribe(
                            (imageData) => {
                                data.photo = imageData.url;
                                // Replace this new Data with the data (photo) updated
                                this.replaceResourceAt(originalLastIndex, data);
                            },
                            (error) =>
                                alert(
                                    'Something went wrong uploading the image: ' +
                                    error.toString()
                                )
                        );
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
                    if (!this.modal.hasFile) return;
                    this.serviceService
                        .uploadImage(
                            data.idService.toString(),
                            this.obtainImageFormData()
                        )
                        .subscribe(
                            (imageData) => {
                                data.photo = imageData.url;
                                // Replace the updated Data with the data (photo) updated
                                this.replaceResourceAt(index, data);
                            },
                            (error) =>
                                alert(
                                    'Something went wrong uploading the image: ' +
                                    error.toString()
                                )
                        );
                },
                (error) => {
                    this.createAlertError(messagesAlert.edit.error);
                    console.log(error);
                }
            );
    }

    protected createAlert(isSuccess: boolean, message: string) {
        const viewContainerRef = this.alertDirective.viewContainerRef;
        viewContainerRef.clear();

        viewContainerRef
            .createComponent<CustomAlertComponent>(
                this.componentFactoryResolver.resolveComponentFactory(
                    CustomAlertComponent
                )
            )
            .instance.setValues(isSuccess, message);
    }


    /*-----------   ANOTHER WAY TO SEARCH IN ALL RESOURCES GOTTEN BY API  ---------*/
    /*keyupEnterSearchBar($event) {
        this.newArray = this.resources.filter((res: Service) =>
            res.teacher.name.includes($event) || res.teacher.lastname.includes($event)
        );
    }*/
}
