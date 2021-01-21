import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesPaqComponent } from './ases-paq.component';

describe('AsesPaqComponent', () => {
  let component: AsesPaqComponent;
  let fixture: ComponentFixture<AsesPaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesPaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesPaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
