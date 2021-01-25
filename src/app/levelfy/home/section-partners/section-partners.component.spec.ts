import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPartnersComponent } from './section-partners.component';

describe('SectionPartnersComponent', () => {
  let component: SectionPartnersComponent;
  let fixture: ComponentFixture<SectionPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
