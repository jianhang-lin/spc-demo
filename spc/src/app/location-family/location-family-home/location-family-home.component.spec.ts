import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFamilyHomeComponent } from './location-family-home.component';

describe('LocationFamilyHomeComponent', () => {
  let component: LocationFamilyHomeComponent;
  let fixture: ComponentFixture<LocationFamilyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFamilyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFamilyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
