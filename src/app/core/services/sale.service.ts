import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { Service } from '../../shared/_models/service.model';
import { Sale } from '../../shared/_models/sale.model';
import { HttpClient } from '@angular/common/http';

const uri = '/model/sale';

@Injectable({
    providedIn: 'root',
})
export class SaleService extends DataService<Sale> {
    constructor(http: HttpClient) {
        super(uri, http);
    }
}
