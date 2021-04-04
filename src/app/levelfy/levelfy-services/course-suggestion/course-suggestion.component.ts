import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CourseSuggestionService } from '../../../core/services/course-suggestion.service';
import { CourseSuggestion } from '../../../shared/_models/course-suggestion.model';
import { OpenClientService } from '../../../core/services/open-client.service';
import { CustomAlertDirective } from '../../../shared/custom-alert/custom-alert.directive';
import { CustomAlertComponent } from '../../../shared/custom-alert/custom-alert.component';

/*
	The course suggestion section at the end of every services page
 */

const messageAlertSuccess = 'Mensaje enviado correctamente';
const messageAlertError = 'Hubo un error al mandar el mensaje';

@Component({
    selector: 'app-course-suggestion',
    templateUrl: './course-suggestion.component.html',
    styleUrls: ['./course-suggestion.component.scss'],
})
export class CourseSuggestionComponent implements OnInit {
    @ViewChild(CustomAlertDirective, { static: true })
    alertDirective: CustomAlertDirective;

    constructor(
        private openClientService: OpenClientService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    value: string = '';

    sendSuggestion() {
        if (!this.value) return;
        let courseSuggestion = new CourseSuggestion();
        courseSuggestion.name = this.value;
        this.openClientService.sendSuggestion(courseSuggestion).subscribe(
            (data) => {
                this.createAlert(true, messageAlertSuccess);
            },
            (error) => {
                this.createAlert(false, messageAlertError);
            }
        );
        this.value = '';
    }

    ngOnInit(): void {}

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
