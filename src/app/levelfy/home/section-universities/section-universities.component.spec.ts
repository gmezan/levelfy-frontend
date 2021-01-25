import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUniversitiesComponent } from './section-universities.component';

describe('SectionUniversitiesComponent', () => {
  let component: SectionUniversitiesComponent;
  let fixture: ComponentFixture<SectionUniversitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionUniversitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
