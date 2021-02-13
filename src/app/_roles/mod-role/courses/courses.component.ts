import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalCrudComponent } from '../../../core/common/modal-crud-component';
import { Course } from '../../../shared/_models/course.model';
import { AuthService } from '../../../core/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CourseService } from '../../../core/services/course.service';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';

const path = '/m/courses';

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

const searchBarSelector = '.courseName';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent
    extends ModalCrudComponent<Course>
    implements OnInit {

  @ViewChild(CustomAlertDirective, { static: true })
  alertDirective: CustomAlertDirective;

  univ: string;

  constructor(
      private authService: AuthService,
      protected router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private courseService: CourseService,
      protected elementRef: ElementRef,
      private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(courseService,
        modalStrings,
        new Course(),
        searchBarSelector,
        elementRef,
        router,
        path
    );
    this.form = this.fillModal();
    this.univ = '';
    this.univ = authService.getCurrentUser().university;
  }

  ngOnInit(): void {
    this.universities = [this.univ];
    this.route.queryParams.subscribe(() => {
      this.resources = [];
      this.title = 'Curso por universidad: ' + this.univ;
      let queryParams = {u: this.univ};
      this.courseService
          .getAll(queryParams)
          .subscribe((data) => {
            this.resources = data;
            this.updateResourcesSliced();
          });
    });
  }



  fillModal() {
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

  onSubmitModalForm(resource: Course, index , id) {
    console.log(resource);
    if (this.modal.isDelete && resource.courseId.university == this.univ)
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
    else if (this.modal.isCreate && resource.courseId.university == this.univ)
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
    else if (this.modal.isEdit && resource.courseId.university == this.univ)
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
    else if (resource.courseId.university != this.univ)
      alert('University must be the same that yours!');
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
