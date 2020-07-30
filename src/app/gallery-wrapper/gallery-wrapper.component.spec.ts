import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryWrapperComponent } from './gallery-wrapper.component';

describe('GalleryWrapperComponent', () => {
  let component: GalleryWrapperComponent;
  let fixture: ComponentFixture<GalleryWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
