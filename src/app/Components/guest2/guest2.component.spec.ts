import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guest2Component } from './guest2.component';

describe('Guest2Component', () => {
  let component: Guest2Component;
  let fixture: ComponentFixture<Guest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Guest2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
