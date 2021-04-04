import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleClientService } from '../../../core/services/role-client.service';
import { DOCUMENT } from '@angular/common';
import { User } from '../../../shared/_models/user.model';
import { AuthService } from '../../../core/security/auth.service';
import { TokenService } from '../../../core/security/token.service';

@Component({
    selector: 'app-client-registration',
    templateUrl: './client-registration.component.html',
    styleUrls: ['./client-registration.component.css'],
})
export class ClientRegistrationComponent
    extends NavbarPageComponent
    implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private roleClientService: RoleClientService,
        @Inject(DOCUMENT) document: any,
        private fb: FormBuilder,
        private authService: AuthService,
        private tokenService: TokenService
    ) {
        super(document);
        this.form = this.fillForm();
    }
    headerText: string;
    messageLeft: string;
    messageParagraph: string;
    user: User = new User();
    form: FormGroup;

    ngOnInit(): void {
        this.messageLeft = 'Completa tu registro en Levelfy!';
        this.messageParagraph =
            'Esta información es privada y no la compartiremos. Asegurate de que la información sea correcta antes de guardarla';
        this.headerText = 'Registro';

        this.user = this.authService.getCurrentUser();

        if (this.isUserRegistrationCompleted(this.user))
            this.router.navigate(['/c']);

        this.form = this.fillForm();
    }

    onSubmitForm() {
        if (!this.form.valid) return;
        let user = this.form.value;
        this.user.email = user.email;
        this.user.name = user.name;
        this.user.university = user.university;
        this.user.birthday = user.birthday;
        this.user.gender = user.gender;
        this.user.phone = user.phone;

        this.roleClientService.completeRegistration(this.user).subscribe(
            (data) => {
                this.tokenService.setUser(data);
                this.router.navigate(['/c']);
            },
            (error) => {
                alert('Hubo un error con el registro');
                console.log(error);
            }
        );
    }

    private fillForm(): FormGroup {
        // Validations must be according to the database
        return this.fb.group({
            idUser: [this.user.idUser, Validators.required],
            email: [this.user.email, Validators.required],
            name: [this.user.name, Validators.required],
            university: [this.user.university, Validators.required],
            birthday: [this.user.birthday, Validators.required],
            gender: [this.user.gender, Validators.required],
            phone: [this.user.phone],
        });
    }

    isUserRegistrationCompleted(user: User): boolean {
        if (!user.phone || user.phone === 0) return false;
        if (!user.name || user.name === '') return false;
        if (!user.university || user.university === '') return false;
        if (!user.birthday || user.birthday === '') return false;
        return !(!user.gender || user.gender === '');
    }
}
