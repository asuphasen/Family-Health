import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhScanPage } from './fh-scan.page';

describe('FhScanPage', () => {
  let component: FhScanPage;
  let fixture: ComponentFixture<FhScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhScanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
