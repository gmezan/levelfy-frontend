import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuServicesComponent } from './menu-services.component';

describe('MenuServicesComponent', () => {
  let component: MenuServicesComponent;
  let fixture: ComponentFixture<MenuServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
