import {
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Course } from '../../../shared/_models/course.model';
import { Service } from '../../../shared/_models/service.model';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../core/services/service.service';

const path = '/a/services';

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

    constructor(
        protected router: Router,
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        protected elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
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
            this.serviceService.getAll(queryParams).subscribe((data) => {
                this.resources = data;
                this.resourcesSliced = this.resources.slice(
                    (this.pageNumber - 1) * this.pageSize,
                    this.pageNumber * this.pageSize
                );
            });
        });
    }

    getId(resource: Service): string {
        return resource.idService.toString();
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

    fillModal(): FormGroup {
        // Validations must be according to the database
        return this.fb.group({
            idService: [this.resource.idService, Validators.required],
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
            photo: [this.resource.photo],
            available: [this.resource.available],
            serviceType: [this.resource.serviceType],
            price: [this.resource.price],
            evaluation: [this.resource.evaluation],
            description: [this.resource.description],
            expiration: [this.resource.expiration],
            sessionsNumber: [this.resource.sessionsNumber],
            archived: [this.resource.sessionsNumber],
        });
    }
    onSubmitModalForm(resource: Service, index: number, id: string): void {
        throw new Error('Method not implemented.');
    }

    protected createAlert(isSuccess: boolean, message: string) {}
}
