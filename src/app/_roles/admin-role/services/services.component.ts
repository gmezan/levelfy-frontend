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
import { FormBuilder, FormGroup } from '@angular/forms';
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

const searchBarSelector = '.name';

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
    constructor(
        private router: Router,
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
            elementRef
        );
        this.form = this.fillModal();
        this.universities.splice(0, 0, 'All');
    }

    getId(resource: Service): string {
        throw new Error('Method not implemented.');
    }
    fillModal(): FormGroup {
        throw new Error('Method not implemented.');
    }
    onSubmitModalForm(resource: Service, index: number, id: string): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {}

    protected createAlert(isSuccess: boolean, message: string) {}
}
