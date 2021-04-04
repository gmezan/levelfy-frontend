import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { OpenClientService } from '../../core/services/open-client.service';
import { ContactMessage } from '../../shared/_models/contact-message.model';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomAlertDirective } from '../../shared/custom-alert/custom-alert.directive';
import { CustomAlertComponent } from '../../shared/custom-alert/custom-alert.component';

const messageAlertSuccess = 'Mensaje enviado correctamente';
const messageAlertError = 'Hubo un error al mandar el mensaje';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent extends NavbarPageComponent implements OnInit {
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    supportEmail: string = 'peru.universityclass@gmail.com';
    supportNumber: string = '987654321';
    supportFacebookPage: string = 'https://facebook.com';

    contactMessage: ContactMessage = new ContactMessage();
    form: FormGroup;

    constructor(
        @Inject(DOCUMENT) document: any,
        private openClientService: OpenClientService,
        private fb: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(document);
        this.form = this.fillForm();
    }

    ngOnInit(): void {
        this.putNoHeaderNavbarDark();
    }

    fillForm(): FormGroup {
        return this.fb.group({
            id: [this.contactMessage.id],
            name: [this.contactMessage.name, [Validators.required]],
            contact: [this.contactMessage.contact, [Validators.required]],
            message: [this.contactMessage.message, [Validators.required]],
        });
    }

    resetForm(): void {
        this.contactMessage = new ContactMessage();
        this.form = this.fillForm();
    }

    submitModalForm(): void {
        if (!this.form.valid) return;

        let contactMessage: ContactMessage = this.form.value;

        this.openClientService.postContactMessage(contactMessage).subscribe(
            (data) => {
                this.resetForm();
                this.createAlert(true, messageAlertSuccess);
            },
            (error) => {
                this.resetForm();
                this.createAlert(false, messageAlertError);
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
