import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginadminPage } from './loginadmin.page';

describe('LoginadminPage', () => {
  let component: LoginadminPage;
  let fixture: ComponentFixture<LoginadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
