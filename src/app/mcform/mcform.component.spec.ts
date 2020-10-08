import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCFormComponent } from './mcform.component';

describe('MCFormComponent', () => {
  let component: MCFormComponent;
  let fixture: ComponentFixture<MCFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
