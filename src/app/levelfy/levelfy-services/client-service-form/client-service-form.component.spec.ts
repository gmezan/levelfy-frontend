import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServiceFormComponent } from './client-service-form.component';

describe('ClientServiceFormComponent', () => {
  let component: ClientServiceFormComponent;
  let fixture: ComponentFixture<ClientServiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientServiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
