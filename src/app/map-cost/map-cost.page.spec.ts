import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCostPage } from './map-cost.page';

describe('MapCostPage', () => {
  let component: MapCostPage;
  let fixture: ComponentFixture<MapCostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
