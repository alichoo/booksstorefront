import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingrequestPage } from './borrowingrequest.page';

describe('BorrowingrequestPage', () => {
  let component: BorrowingrequestPage;
  let fixture: ComponentFixture<BorrowingrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowingrequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
