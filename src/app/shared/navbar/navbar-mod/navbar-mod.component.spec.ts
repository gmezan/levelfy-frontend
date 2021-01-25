import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarModComponent } from './navbar-mod.component';

describe('NavbarModComponent', () => {
  let component: NavbarModComponent;
  let fixture: ComponentFixture<NavbarModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
