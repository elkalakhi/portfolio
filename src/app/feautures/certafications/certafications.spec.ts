import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certafications } from './certafications';

describe('Certafications', () => {
  let component: Certafications;
  let fixture: ComponentFixture<Certafications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certafications],
    }).compileComponents();

    fixture = TestBed.createComponent(Certafications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
