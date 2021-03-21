import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachInfoCardComponent } from './teach-info-card.component';

describe('TeachInfoCardComponent', () => {
  let component: TeachInfoCardComponent;
  let fixture: ComponentFixture<TeachInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
