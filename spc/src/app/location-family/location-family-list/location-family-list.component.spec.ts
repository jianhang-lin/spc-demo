import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFamilyListComponent } from './location-family-list.component';

describe('LocationFamilyListComponent', () => {
  let component: LocationFamilyListComponent;
  let fixture: ComponentFixture<LocationFamilyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFamilyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
