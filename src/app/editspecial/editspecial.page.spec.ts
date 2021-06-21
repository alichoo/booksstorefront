import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditspecialPage } from './editspecial.page';

describe('EditspecialPage', () => {
  let component: EditspecialPage;
  let fixture: ComponentFixture<EditspecialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditspecialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditspecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
