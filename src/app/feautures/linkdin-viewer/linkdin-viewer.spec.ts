import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkdinViewer } from './linkdin-viewer';

describe('LinkdinViewer', () => {
  let component: LinkdinViewer;
  let fixture: ComponentFixture<LinkdinViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkdinViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkdinViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
