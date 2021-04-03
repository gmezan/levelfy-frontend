import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import {
    mapServiceRoute2ServiceType,
    servicesTypes,
} from '../../../core/util/services-types';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { RoleClientService } from '../../../core/services/role-client.service';
import { Enrollment } from '../../../shared/_models/enrollment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentDto } from '../../../shared/_dto/payment.dto';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';
import { ForumComponent } from '../../../shared/forum/forum.component';
import { ForumDirective } from '../../../shared/forum/forum.directive';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.css'],
})
export class EnrollmentComponent extends NavbarPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router,
        private roleClientService: RoleClientService,
        @Inject(DOCUMENT) document: any,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(document);
        this.enrollment = new Enrollment();
        this.paymentDto = new PaymentDto();
        this.form = this.fillModal();
    }

    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    @ViewChild(ForumDirective, { static: true })
    forumDirective: ForumDirective;

    form: FormGroup;

    enrollment: Enrollment;
    serviceType: typeof servicesTypes[0];
    paymentDto: PaymentDto;
    emailSupport = 'peru.universityclass@gmail.com';

    messageForTheButton = '¡Ya estás inscrito en esta asesoría!';

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();

        this.route.params.subscribe((params) => {
            let id = params.id;

            if (!id) {
                // verify services TYPE exists
                this.error();
                return;
            }

            this.roleClientService.getEnrollment(id).subscribe(
                (data) => {
                    this.enrollment = data;
                    this.loadForum(data);
                    this.paymentDto.persona = this.enrollment.student.fullName;
                    this.paymentDto.enrollmentId = this.enrollment.idEnrollment;
                    this.paymentDto.amount = this.enrollment.service.price;
                    this.paymentDto.email = this.enrollment.student.email;
                    this.form = this.fillModal();
                    this.serviceType =
                        mapServiceRoute2ServiceType[
                            this.enrollment.service.serviceType
                                .toLowerCase()
                                .replace('_', '-')
                        ];
                    this.roleClientService
                        .getServiceSessionList(data)
                        .subscribe((list) => {
                            this.enrollment.service.serviceSessionList = list;
                        });

                    this.roleClientService
                        .getSaleList(data)
                        .subscribe((list) => {
                            this.enrollment.saleList = list;
                        });
                },
                (error1) => {
                    console.log(error1);
                }
            );
        });
    }

    fillModal(): FormGroup {
        // Validations must be according to the database
        return this.fb.group({
            persona: [this.paymentDto.persona, Validators.required],
            date: [this.paymentDto.date, Validators.required],
            email: [
                this.paymentDto.email,
                [Validators.required, Validators.email],
            ],
            message: [this.paymentDto.message, Validators.maxLength(256)],
            amount: [
                this.paymentDto.amount,
                [Validators.required, Validators.min(0), Validators.max(99999)],
            ],
            method: [this.paymentDto.method, Validators.required],
            enrollmentId: [this.paymentDto.enrollmentId, Validators.required],
            coupon: [this.paymentDto.coupon],
        });
    }

    submitForm() {
        let paymentDto: PaymentDto = this.form.value;
        this.roleClientService.registerPayment(paymentDto).subscribe(
            (data) => {
                this.enrollment.saleList.splice(0, 1, data);
                this.createAlert(true, 'Pago registrado satisfactoriamente');
            },
            (error1) => {
                console.log(error1);
                this.createAlert(
                    false,
                    'Hubo un problema al registrar el pago'
                );
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

    protected loadForum(enrollment: Enrollment) {
        const viewContainerRef = this.forumDirective.viewContainerRef;
        viewContainerRef.clear();

        viewContainerRef.createComponent<ForumComponent>(
            this.componentFactoryResolver.resolveComponentFactory(
                ForumComponent
            )
        ).instance.service = enrollment.service;
    }

    error() {
        this.router.navigate(['/error']).then();
    }
}
