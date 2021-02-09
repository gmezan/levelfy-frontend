import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesPerComponent } from './ases-per.component';

describe('AsesPerComponent', () => {
  let component: AsesPerComponent;
  let fixture: ComponentFixture<AsesPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesPerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
