import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { Course } from '../../../shared/_models/course.model';
import { User } from '../../../shared/_models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { UserService } from '../../../core/services/user.service';
import { Service } from '../../../shared/_models/service.model';
import { Roles } from '../../../core/util/roles.data';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { AuthService } from '../../../core/security/auth.service';

const path = '/t/services';

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

const searchBarSelector = '.courseName';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
})
export class ServicesComponent
    extends ModalCrudComponent<Service>
    implements OnInit {
    // For Alert:
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    // variables used to find users by role and university
    servicesSelector: string[];
    universitiesSelector: string[];

    // attributes for usages in the form
    courseSelector: Course[];
    userSelector: User[];
    availableSelector: string[];

    //Additional
    title3: string;
    prices: any;
    pricesSelector: number[];
    user: User;

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver,
        private courseService: CourseService,
        private userService: UserService,
        private authService: AuthService
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

        this.universitiesSelector = [];
        this.universities.forEach((u) => {
            this.universitiesSelector.push(u);
        });
        this.universitiesSelector.splice(0, 0, 'All');

        this.servicesSelector = [];
        this.services.forEach((s) => {
            this.servicesSelector.push(s.key);
        });
        this.servicesSelector.splice(0, 0, 'All');

        this.availableSelector = ['All', 'true', 'false'];
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Univ: ';
            this.title2 = 'Service: ';
            this.title3 = 'Available: ';

            this.user = this.authService.getCurrentUser();

            let queryParams;
            if (params.s && params.a)
                queryParams = {
                    u: this.user.university,
                    s: params.s,
                    a: params.a,
                };
            else if (params.s)
                queryParams = { u: this.user.university, s: params.s };
            else if (params.a)
                queryParams = { u: this.user.university, a: params.a };
            else queryParams = { u: this.user.university };

            //console.log('Routing to: ', queryParams);
            this.serviceService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.resourcesSliced = this.resources.slice(
                    (this.pageNumber - 1) * this.pageSize,
                    this.pageNumber * this.pageSize
                );
            });
            this.serviceService.getPrices().subscribe((data) => {
                this.prices = data;
            });
        });
    }

    get serviceAgendaList() {
        return this.form.get('serviceAgendaList') as FormArray;
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

    getId(resource: Service): string {
        return resource.idService.toString();
    }

    onOptionsSelected(university: string, service: string, available: string) {
        if (!this.servicesSelector.includes(service) || service === 'All')
            service = null;
        if (!this.availableSelector.includes(available) || available === 'All')
            available = null;
        let queryParams = { s: service, a: available };
        this.router.navigate([this.path], {
            queryParams: queryParams,
        });
    }

    fillModal(): FormGroup {
        // Validations must be according to the database

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

        if (this.modal.isCreate) {
            this.resource.course.courseId.university = this.user.university;
            this.resource.teacher = this.user;
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
                    university: [this.user?.university, Validators.required],
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

    get serviceSessionList() {
        return this.form.get('serviceSessionList') as FormArray;
    }
    get evaluation() {
        return this.form.get('evaluation').value;
    }
    get serviceType() {
        return this.form.get('serviceType').value;
    }
    get university() {
        return this.form.get('course').get('courseId').get('university').value;
    }

    /*
      This function automates the price assignment in the Create Form Modal
   */
    checkChangeForPrice() {
        let price;
        //console.log(this.evaluation, this.serviceType, this.university);
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

    addServiceSession() {
        this.serviceSessionList.push(
            new FormGroup({
                date: new FormControl('', Validators.required),
                start: new FormControl('', Validators.required),
                end: new FormControl('', Validators.required),
            })
        );
    }

    deleteServiceSession() {
        this.serviceSessionList.removeAt(this.serviceSessionList.length - 1);
    }

    onUniversitySelected(value: string) {
        this.courseService
            .getAll({ u: value })
            .subscribe((data) => (this.courseSelector = data));
        this.userService
            .getAll({ u: value, r: Roles.teach })
            .subscribe((data) => (this.userSelector = data));

        // For the price
        this.checkChangeForPrice();
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
                    console.log(data);
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
}