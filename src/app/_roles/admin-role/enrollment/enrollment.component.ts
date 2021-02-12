import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
} from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Enrollment } from '../../../shared/_models/enrollment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../shared/_models/service.model';
import { EnrollmentService } from '../../../core/services/enrollment.service';

const modalStrings = {
    create: { title: 'Create Enrollment', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Edit Enrollment', submit: 'Save', cancel: 'Cancel' },
    delete: { title: 'Delete Enrollment', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
    create: {
        success: 'Enrollment created successfully',
        error: 'There was an error creating this Enrollment, try again later',
    },
    edit: {
        success: 'Enrollment edited successfully',
        error: 'There was an error updating this Enrollment, try again later',
    },
    delete: {
        success: 'Service deleted correctly',
        error: 'There was an error deleting this Enrollment, try again later',
    },
    image: {
        success: 'Image uploaded correctly',
        error: 'There was an error uploading the image, try again later',
    },
};

const searchBarSelector = '.clientFullName';
const path = '/a/enrollments';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.css'],
})
export class EnrollmentComponent
    extends ModalCrudComponent<Enrollment>
    implements OnInit {
    // variables used to find users by role and university
    servicesSelector: string[];
    universitiesSelector: string[];

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private enrollmentService: EnrollmentService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(
            enrollmentService,
            modalStrings,
            new Enrollment(),
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
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Universidad: ';
            this.title2 = 'Servicio: ';

            let queryParams;
            if (params.u && params.s)
                queryParams = { u: params.u, s: params.s };
            else if (params.u) queryParams = { u: params.u };
            else if (params.s) queryParams = { s: params.s };
            else queryParams = null;

            //console.log('Routing to: ', queryParams);
            this.enrollmentService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.resourcesSliced = this.resources.slice(
                    (this.pageNumber - 1) * this.pageSize,
                    this.pageNumber * this.pageSize
                );
            });
        });
    }

    onOptionsSelected(university: string, service: string) {
        console.log(university, service);
        if (
            !this.universitiesSelector.includes(university) ||
            university === 'All'
        )
            university = null;
        if (!this.servicesSelector.includes(service) || service === 'All')
            service = null;

        let queryParams = { u: university, s: service };

        this.router.navigate([this.path], {
            queryParams: queryParams,
        });
    }

    getId(resource: Enrollment): string {
        return resource.idEnrollment.toString();
    }

    protected createAlert(isSuccess: boolean, message: string) {}

    fillModal(): FormGroup {
        // Validations must be according to the database
        return this.fb.group({
            idEnrollment: [this.resource.idEnrollment, Validators.required],
            service: this.fb.group({
                idService: [this.resource.service.idService],
            }),
            student: this.fb.group({
                idUser: [this.resource.student.idUser, Validators.required],
            }),
            payed: [this.resource.payed],
            numberOfStudents: [this.resource.numberOfStudents],
            start: [this.resource.start],
            end: [this.resource.end],
            info: [this.resource.info],
            active: [this.resource.active],
            url: [this.resource.url],
        });
    }

    onSubmitModalForm(resource: Enrollment, index: number, id: string): void {}
}
