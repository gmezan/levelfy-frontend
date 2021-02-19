import { FormGroup } from '@angular/forms';
import { Modal } from '../../shared/_dto/modal.model';
import { DataService } from './data-service.service';
import { ElementRef } from '@angular/core';
import { universitiesData } from '../util/universities.data';
import { Roles } from '../util/roles.data';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { servicesTypes } from '../util/services-types';
import { Evaluations } from '../util/evaluations.data';

const pageSizeOptions = [5, 10, 20, 30];

export abstract class ModalCrudComponent<T> {
    // Must-haves
    title: string;
    form: FormGroup;
    modal = new Modal();

    // Auxiliary title
    title2: string;

    // variables to paginate
    pageSize = 5;
    pageSizeOptions = pageSizeOptions;
    pageNumber = 1;
    resourcesSliced: T[];

    // Resources
    resources: T[];
    resource: T;

    // Additional
    universities = universitiesData;
    roles = Object.keys(Roles).filter((key) => key);
    services = servicesTypes;
    evaluations = Object.keys(Evaluations).filter((key) => key);

    protected constructor(
        protected dataService: DataService<T>,
        protected modalStrings: any,
        protected newResource: T,
        protected searchBarSelector: string,
        protected elementRef: ElementRef,
        protected router: Router,
        protected path: string
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
            console.log(this.form);
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
        this.updateResourcesSliced();
    }

    protected replaceResourceAt(index: number, resource: T): void {
        this.resources.splice(index, 1, resource);
        this.updateResourcesSliced();
    }

    protected deleteResourceAt(index: number): void {
        this.resources.splice(index, 1);
        this.updateResourcesSliced();
    }

    // Method to handle PageEvent
    handlePage(e: PageEvent): void {
        this.pageSize = e.pageSize;
        this.pageNumber = e.pageIndex + 1;
        this.resourcesSliced = this.resources.slice(
            (this.pageNumber - 1) * this.pageSize,
            this.pageNumber * this.pageSize
        );
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

    protected updateResourcesSliced() {
        this.resourcesSliced = this.resources.slice(
            (this.pageNumber - 1) * this.pageSize,
            this.pageNumber * this.pageSize
        );
    }

    protected createAlertSuccess(message: string) {
        this.createAlert(true, message);
    }

    protected createAlertError(message: string) {
        this.createAlert(false, message);
    }

    protected abstract createAlert(isSuccess: boolean, message: string);
}
