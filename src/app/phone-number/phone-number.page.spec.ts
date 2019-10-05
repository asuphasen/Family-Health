import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberPage } from './phone-number.page';

describe('PhoneNumberPage', () => {
  let component: PhoneNumberPage;
  let fixture: ComponentFixture<PhoneNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
