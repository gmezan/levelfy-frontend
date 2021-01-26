import { FormGroup } from '@angular/forms';
import { Modal } from '../../shared/_dto/modal.model';
import { DataService } from './data-service.service';
import { ViewChild } from '@angular/core';

export abstract class ModalCrudComponent<T> {
    // Must-haves
    title: string;
    form: FormGroup;
    modal = new Modal();
    dataService: DataService<T>;
    modalStrings;

    // Resources
    resources: T[];
    resource: T;

    // Must not change
    newResource: T;

    protected constructor(
        dataService: DataService<T>,
        modalStrings: any,
        newResource: T
    ) {
        this.dataService = dataService;
        this.modalStrings = modalStrings;
        this.resource = newResource;
        this.newResource = newResource;
    }

    // Methods to be implemented by the Component
    abstract getId(resource: T): string;
    abstract fillModal(): FormGroup;
    abstract submitModalForm(): void;

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
}
