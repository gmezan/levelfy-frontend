import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { OpenClientService } from '../../core/services/open-client.service';
import { ContactMessage } from '../../shared/_models/contact-message.model';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent extends NavbarPageComponent implements OnInit {
    supportEmail: string = 'peru.universityclass@gmail.com';
    supportNumber: string = '987654321';
    supportFacebookPage: string = 'https://facebook.com';

    contactMessage: ContactMessage = new ContactMessage();
    form: FormGroup;

    constructor(
        @Inject(DOCUMENT) document: any,
        private openClientService: OpenClientService,
        private fb: FormBuilder
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
                console.log(data);
            },
            (error) => {
                alert('Hubo un problema al enviar el mensaje');
                console.log(error);
            }
        );
    }
}
