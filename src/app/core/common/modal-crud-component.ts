import { FormGroup } from '@angular/forms';
import { Modal } from '../../shared/_dto/modal.model';
import { DataService } from './data-service.service';
import { ElementRef } from '@angular/core';
import { universitiesData } from '../util/universities.data';
import { Roles } from '../util/roles.data';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

const pageSizeOptions = [5, 10, 20, 30];
const queryParams = {u: 'PUCP', r: 'ADMIN'}

export abstract class ModalCrudComponent<T> {
    // Must-haves
    title: string;
    form: FormGroup;
    modal = new Modal();
    // variables used to find users by role and university
    queryParams = queryParams;
    rolesSelector: string[];
    universitiesSelector: string[];
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
    roles = Object.keys(Roles)
        .filter((key) => !isNaN(Number(Roles[key])));

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
        console.log('modalDelete is okay');
    }

    onOptionsSelected(univ: string, rol: string, type: string) {
        console.log(univ,rol);
        let queryParams2 = univ != 'All' ? { u: univ } : null;
        if (univ!=null && type =='SearchUser') {
            this.queryParams.u = univ;
            this.queryParams.r = this.queryParams.r || '1';
        } else if (rol!=null && type == 'SearchUser') {
            this.queryParams.u = this.queryParams.u || 'PUCP';
            this.queryParams.r = Roles[rol] + 1;
        } else if (univ!=null && type =='SearchCourse') {
            queryParams2 = univ != 'All' ? { u: univ } : null;
        }
        if (type == 'SearchUser') {
            this.router.navigate([this.path], { queryParams: this.queryParams });
        } else if (type == 'SearchCourse') {
            this.router.navigate([this.path], { queryParams: queryParams2 });
        }
    }

    onSelectFile(event) {
        // called each time file input changes

        this.modal.hasFile = true;
        this.modal.fileFormData = event.target.files[0];
    }

    submitModalForm() {
        // Using Pessimistic update
        if (!this.form.valid) {
            console.log();
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

    // Method to handle PageEvent
    handlePage(e: PageEvent): void {
        this.pageSize = e.pageSize;
        this.pageNumber = e.pageIndex + 1;
        this.resourcesSliced = this.resources.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
    }

    // Methods for the search bar:
    keyupEnterSearchBar($event) {
        console.log('aea');
        this.elementRef.nativeElement
            .querySelectorAll(this.searchBarSelector)
            .forEach((el) => {
                console.log('inside');
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

    protected createAlertSuccess(message: string) {
        this.createAlert(true, message);
    }

    protected createAlertError(message: string) {
        this.createAlert(false, message);
    }

    protected abstract createAlert(isSuccess: boolean, message: string);
}
