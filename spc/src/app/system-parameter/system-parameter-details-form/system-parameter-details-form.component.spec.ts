import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemParameterDetailsFormComponent } from './system-parameter-details-form.component';

describe('SystemParameterDetailsFormComponent', () => {
  let component: SystemParameterDetailsFormComponent;
  let fixture: ComponentFixture<SystemParameterDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemParameterDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemParameterDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
