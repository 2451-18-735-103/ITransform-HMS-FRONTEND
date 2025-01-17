import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Staff2Component } from './staff2.component';

describe('Staff2Component', () => {
  let component: Staff2Component;
  let fixture: ComponentFixture<Staff2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Staff2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Staff2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
