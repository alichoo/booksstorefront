import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaboutusPage } from './editaboutus.page';

describe('EditaboutusPage', () => {
  let component: EditaboutusPage;
  let fixture: ComponentFixture<EditaboutusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaboutusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaboutusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
