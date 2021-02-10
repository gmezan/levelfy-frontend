import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/_models/course.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { CourseValidator } from '../../../core/validators/course.validator';

const modalStrings = {
    create: { title: 'Create Course', submit: 'Create', cancel: 'Cancel' },
    edit: { title: 'Edit Course', submit: 'Save', cancel: 'Cancel' },
    delete: { title: 'Delete Course', submit: 'Delete', cancel: 'Cancel' },
};

const messagesAlert = {
    create: {
        success: 'Course created successfully',
        error: 'There was an error creating this course, try again later',
    },
    edit: {
        success: 'Course edited successfully',
        error: 'There was an error updating this course, try again later',
    },
    delete: {
        success: 'Course deleted correctly',
        error: 'There was an error deleting this course, try again later',
    },
    image: {
        success: 'Image uploaded correctly',
        error: 'There was an error uploading the image, try again later',
    },
};

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
})
export class CoursesComponent
    extends ModalCrudComponent<Course>
    implements OnInit {
    // For Alert:
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private elementRef: ElementRef,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(courseService, modalStrings, new Course());
        this.form = this.fillModal();
    }

    ngOnInit(): void {
        // For multiple Courses
        this.route.queryParams.subscribe((params) => {
            this.resources = [];
            this.title = 'Curso por universidad: ' + (params.u || 'All');
            let options = params.u ? { u: params.u } : null;
            this.courseService
                .getAll(options)
                .subscribe((data) => (this.resources = data));
        });
    }

    fillModal() {
        // Validations must be according to the database
        return this.fb.group({
            courseId: this.fb.group({
                idCourse: [
                    this.resource.courseId.idCourse,
                    Validators.required,
                ],
                university: [
                    this.resource.courseId.university,
                    Validators.required,
                ],
            }),
            name: [this.resource.name, Validators.required],
            cycle: [
                this.resource.cycle,
                [Validators.min(1), Validators.max(10), Validators.required],
            ],
            photo: [this.resource.photo],
            description: [this.resource.description],
        });
    }

    getId(course: Course): string {
        return course.courseId.idCourse.concat('/', course.courseId.university);
    }

    // Methods for the search bar:
    keyupEnterSearchBar($event) {
        this.elementRef.nativeElement
            .querySelectorAll('.courseName')
            .forEach((el) => {
                el.parentElement.hidden =
                    $event.target.value &&
                    !CoursesComponent.refactorString(el.innerHTML)
                        .toString()
                        .includes(
                            CoursesComponent.refactorString($event.target.value)
                        );
            });

        $event.preventDefault();
    }

    private static refactorString(value: string): string {
        return value
            .toLowerCase()
            .split('á')
            .join('a')
            .split('é')
            .join('e')
            .split('í')
            .join('i')
            .split('ó')
            .join('o')
            .split('ú')
            .join('u');
    }

    onSubmitModalForm(resource, index, id) {
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
                    this.courseService
                        .uploadImage(id, this.obtainImageFormData())
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
                    this.courseService
                        .uploadImage(id, this.obtainImageFormData())
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
