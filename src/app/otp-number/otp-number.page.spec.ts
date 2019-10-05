import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpNumberPage } from './otp-number.page';

describe('OtpNumberPage', () => {
  let component: OtpNumberPage;
  let fixture: ComponentFixture<OtpNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpNumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
