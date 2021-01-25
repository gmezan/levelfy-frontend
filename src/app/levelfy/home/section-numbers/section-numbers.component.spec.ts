import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNumbersComponent } from './section-numbers.component';

describe('SectionNumbersComponent', () => {
  let component: SectionNumbersComponent;
  let fixture: ComponentFixture<SectionNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
