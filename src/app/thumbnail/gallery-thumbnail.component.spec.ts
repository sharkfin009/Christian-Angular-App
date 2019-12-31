import { async, ComponentFixture, TestBed } from 'gallery-thumbnail/node_modules/.bin/gallery-thumbnail/node_modules/@angular/core/testing';

import { GalleryThumbnailComponent } from 'gallery-thumbnail/node_modules/.bin/gallery-thumbnail/gallery-thumbnail.component';

describe('GalleryThumbnailComponent', () => {
  let component: GalleryThumbnailComponent;
  let fixture: ComponentFixture<GalleryThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
