import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBooksPage } from './borrowed-books.page';

describe('BorrowedBooksPage', () => {
  let component: BorrowedBooksPage;
  let fixture: ComponentFixture<BorrowedBooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowedBooksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
