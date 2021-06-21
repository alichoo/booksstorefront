import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewarrivalPage } from './editnewarrival.page';

describe('EditnewarrivalPage', () => {
  let component: EditnewarrivalPage;
  let fixture: ComponentFixture<EditnewarrivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnewarrivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnewarrivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
