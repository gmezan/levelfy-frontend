import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { Service } from '../../shared/_models/service.model';
import { Sale } from '../../shared/_models/sale.model';
import { HttpClient } from '@angular/common/http';
import { SaleCanceled } from '../../shared/_models/sale-canceled.model';

const uri = '/model/sale-canceled';

@Injectable({
    providedIn: 'root',
})
export class SaleCanceledService extends DataService<SaleCanceled> {
    constructor(http: HttpClient) {
        super(uri, http);
    }
}
