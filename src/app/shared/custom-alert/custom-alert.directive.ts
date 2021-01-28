import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appCustomAlert]',
})
export class CustomAlertDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
