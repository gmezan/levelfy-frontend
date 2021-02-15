import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { SaleCanceled } from '../../../shared/_models/sale-canceled.model';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../../core/services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../../../shared/_models/sale.model';
import { SaleCanceledService } from '../../../core/services/sale-canceled.service';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';

const modalStrings = {
    create: { title: 'Create Sale', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Validate Sale', submit: 'Validate', cancel: 'Cancel' },
    delete: { title: 'Discard Sale', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
    create: {
        success: 'Sale created successfully',
        error: 'There was an error creating this Sale, try again later',
    },
    edit: {
        success: 'Sale Validated successfully',
        error: 'There was an error updating this Sale, try again later',
    },
    delete: {
        success: 'Sale Discarded correctly',
        error: 'There was an error deleting this Sale, try again later',
    },
    image: {
        success: 'Image uploaded correctly',
        error: 'There was an error uploading the image, try again later',
    },
};

const searchBarSelector = '.clientFullName';
const path = '/a/canceled-sales';

@Component({
    selector: 'app-sale-camceled',
    templateUrl: './sale-canceled.component.html',
    styleUrls: ['./sale-canceled.component.css'],
})
export class SaleCanceledComponent
    extends ModalCrudComponent<SaleCanceled>
    implements OnInit {
    // For Alert:
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    // variables used to find users by role and university
    servicesSelector: string[];
    universitiesSelector: string[];
    solvedSelector: string[];

    //Additional
    title3: string;

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private saleCanceledService: SaleCanceledService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(
            saleCanceledService,
            modalStrings,
            new SaleCanceled(),
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

        this.solvedSelector = ['All', 'true', 'false'];
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Univ: ';
            this.title2 = 'Service: ';
            this.title3 = 'Solved: ';

            let queryParams;
            if (params.u && params.s && params.p)
                queryParams = { u: params.u, s: params.s, p: params.p };
            else if (params.u && params.s)
                queryParams = { u: params.u, s: params.s };
            else if (params.u && params.p)
                queryParams = { u: params.u, p: params.p };
            else if (params.p && params.s)
                queryParams = { p: params.p, s: params.s };
            else if (params.u) queryParams = { u: params.u };
            else if (params.s) queryParams = { s: params.s };
            else if (params.p) queryParams = { p: params.p };
            else queryParams = null;

            //console.log('Routing to: ', queryParams);
            this.dataService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.resourcesSliced = this.resources.slice(
                    (this.pageNumber - 1) * this.pageSize,
                    this.pageNumber * this.pageSize
                );
            });
        });
    }

    getId(resource: SaleCanceled): string {
        return resource.id.toString();
    }
    fillModal(): FormGroup {
        return this.fb.group({
            id: [this.resource.id, Validators.required],
            student: this.fb.group({
                idUser: [this.resource.student.idUser],
            }),
            teacher: this.fb.group({
                idUser: [this.resource.teacher.idUser],
            }),
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
            serviceType: [this.resource.serviceType],
            paymentDateTime: [this.resource.paymentDateTime],
            amount: [this.resource.amount],
            message: [this.resource.message],
            method: [this.resource.method],
            dateTimeSaleCreation: [this.resource.dateTimeSaleCreation],
            solved: [this.resource.solved],
        });
    }

    onSubmitModalForm(resource: SaleCanceled, index: number, id: string): void {
        if (this.modal.isEdit)
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

    onOptionsSelected(university: string, service: string, solved: string) {
        if (
            !this.universitiesSelector.includes(university) ||
            university === 'All'
        )
            university = null;
        if (!this.servicesSelector.includes(service) || service === 'All')
            service = null;

        if (!this.solvedSelector.includes(solved) || solved === 'All')
            solved = null;

        let queryParams = { u: university, s: service, p: solved };

        this.router.navigate([this.path], {
            queryParams: queryParams,
        });
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
