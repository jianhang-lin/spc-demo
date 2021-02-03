import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorGroupDetailsFormComponent } from './monitor-group-details-form.component';

describe('MonitorGroupDetailsFormComponent', () => {
  let component: MonitorGroupDetailsFormComponent;
  let fixture: ComponentFixture<MonitorGroupDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorGroupDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorGroupDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
