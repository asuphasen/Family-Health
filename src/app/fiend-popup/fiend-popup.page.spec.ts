import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiendPopupPage } from './fiend-popup.page';

describe('FiendPopupPage', () => {
  let component: FiendPopupPage;
  let fixture: ComponentFixture<FiendPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiendPopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiendPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
