import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGalleryComponent } from './grid-gallery.component';

describe('GridGalleryComponent', () => {
  let component: GridGalleryComponent;
  let fixture: ComponentFixture<GridGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
