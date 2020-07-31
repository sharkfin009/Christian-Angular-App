import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLightboxComponent } from './grid-lightbox.component';

describe('GridLightboxComponent', () => {
  let component: GridLightboxComponent;
  let fixture: ComponentFixture<GridLightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
