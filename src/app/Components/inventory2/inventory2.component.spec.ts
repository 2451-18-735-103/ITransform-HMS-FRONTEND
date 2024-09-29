import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inventory2Component } from './inventory2.component';

describe('Inventory2Component', () => {
  let component: Inventory2Component;
  let fixture: ComponentFixture<Inventory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Inventory2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inventory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
