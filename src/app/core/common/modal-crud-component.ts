import { FormGroup } from '@angular/forms';
import { Modal } from '../../shared/_dto/modal.model';
import { DataService } from './data-service.service';
import { ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Course } from '../../shared/_models/course.model';

export abstract class ModalCrudComponent<T> {
    // Must-haves
    title: string;
    form: FormGroup;
    modal = new Modal();

    // Resources
    resources: T[];
    resource: T;

    protected constructor(
        protected dataService: DataService<T>,
        protected modalStrings: any,
        protected newResource: T,
        protected searchBarSelector: string,
        protected elementRef: ElementRef
    ) {
        this.resource = newResource;
    }

    // Methods to be implemented by the Component
    abstract getId(resource: T): string;
    abstract fillModal(): FormGroup;

    // Methods for the modal
    modalEdit(id: string) {
        this.modal.modalEdit(this.modalStrings.edit);
        this.dataService.get(id).subscribe(
            (data) => {
                this.resource = data;
                this.form = this.fillModal();
            },
            (error) => {
                alert('Something wrong happened: ' + error);
            }
        );
    }

    modalCreate() {
        this.resource = this.newResource;
        this.modal.modalCreate(this.modalStrings.create);
        this.form = this.fillModal();
    }

    modalDelete(id: string) {
        this.modal.modalDelete(this.modalStrings.delete);
        this.dataService.get(id).subscribe(
            (data) => {
                this.resource = data;
                this.form = this.fillModal();
            },
            (error) => {
                alert('Something wrong happened: ' + error);
            }
        );
    }

    onSelectFile(event) {
        // called each time file input changes

        this.modal.hasFile = true;
        this.modal.fileFormData = event.target.files[0];
    }

    submitModalForm() {
        // Using Pessimistic update
        if (!this.form.valid) {
            alert('Invalid submit');
            return;
        }
        // Getting utils variables
        let resource: T = this.form.value;
        let id: string = this.getId(resource);
        let index: number = this.resources.indexOf(
            this.resources.filter((r) => this.getId(r) === id)[0]
        );
        this.onSubmitModalForm(resource, index, id);
    }

    abstract onSubmitModalForm(resource: T, index: number, id: string): void;

    protected obtainImageFormData(): FormData {
        const formData = new FormData();
        formData.append(
            'file',
            this.modal.fileFormData,
            this.modal.fileFormData.name
        );
        return formData;
    }

    protected addResourceAt(index: number, resource: T): void {
        this.resources.splice(index, 0, resource);
    }

    protected replaceResourceAt(index: number, resource: T): void {
        this.resources.splice(index, 1, resource);
    }

    protected deleteResourceAt(index: number): void {
        this.resources.splice(index, 1);
    }

    // Methods for the search bar:
    keyupEnterSearchBar($event) {
        this.elementRef.nativeElement
            .querySelectorAll(this.searchBarSelector)
            .forEach((el) => {
                el.parentElement.hidden =
                    $event.target.value &&
                    !ModalCrudComponent.refactorString(el.innerHTML)
                        .toString()
                        .includes(
                            ModalCrudComponent.refactorString(
                                $event.target.value
                            )
                        );
            });

        $event.preventDefault();
    }

    protected static refactorString(value: string): string {
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
}
