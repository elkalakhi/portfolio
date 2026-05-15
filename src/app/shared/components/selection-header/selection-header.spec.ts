import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionHeader } from './selection-header';

describe('SelectionHeader', () => {
  let component: SelectionHeader;
  let fixture: ComponentFixture<SelectionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
