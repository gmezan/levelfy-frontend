import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Sale } from '../../../shared/_models/sale.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../../core/services/sale.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';

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
const path = '/a/sales';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css'],
})
export class SalesComponent extends ModalCrudComponent<Sale> implements OnInit {
    // For Alert:
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    // variables used to find users by role and university
    servicesSelector: string[];
    universitiesSelector: string[];
    payedSelector: string[];

    //Additional
    title3: string;

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private saleService: SaleService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(
            saleService,
            modalStrings,
            new Sale(),
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

        this.payedSelector = ['All', 'true', 'false'];
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Univ: ';
            this.title2 = 'Service: ';
            this.title3 = 'Payed: ';

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

    fillModal(): FormGroup {
        return this.fb.group({
            idSale: [this.resource.idSale, Validators.required],
            enrollment: this.fb.group({
                idEnrollment: [this.resource.enrollment.idEnrollment],
            }),
            saleDateTime: [this.resource.saleDateTime],
            expirationDateTime: [this.resource.expirationDateTime],
            amount: [this.resource.amount],
            persona: [this.resource.persona],
            coupon: [this.resource.coupon],
            message: [this.resource.message],
            method: [this.resource.method],
        });
    }

    getId(resource: Sale): string {
        return resource.idSale.toString();
    }

    onSubmitModalForm(resource: Sale, index: number, id: string): void {
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

    onOptionsSelected(university: string, service: string, payed: string) {
        if (
            !this.universitiesSelector.includes(university) ||
            university === 'All'
        )
            university = null;
        if (!this.servicesSelector.includes(service) || service === 'All')
            service = null;

        if (!this.payedSelector.includes(payed) || payed === 'All')
            payed = null;

        let queryParams = { u: university, s: service, p: payed };

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
