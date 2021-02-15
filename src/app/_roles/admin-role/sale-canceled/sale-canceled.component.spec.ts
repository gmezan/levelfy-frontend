import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCanceledComponent } from './sale-canceled.component';

describe('SaleCamceledComponent', () => {
    let component: SaleCanceledComponent;
    let fixture: ComponentFixture<SaleCanceledComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SaleCanceledComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SaleCanceledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
