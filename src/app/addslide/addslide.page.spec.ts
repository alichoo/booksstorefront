import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddslidePage } from './addslide.page';

describe('AddslidePage', () => {
  let component: AddslidePage;
  let fixture: ComponentFixture<AddslidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddslidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddslidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
