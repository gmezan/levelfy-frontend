import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appForum]',
})
export class ForumDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
