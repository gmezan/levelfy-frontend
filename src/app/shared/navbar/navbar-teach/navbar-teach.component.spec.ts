import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTeachComponent } from './navbar-teach.component';

describe('NavbarTeachComponent', () => {
  let component: NavbarTeachComponent;
  let fixture: ComponentFixture<NavbarTeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTeachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
