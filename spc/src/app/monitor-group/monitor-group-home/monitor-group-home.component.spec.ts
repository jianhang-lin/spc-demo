import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorGroupHomeComponent } from './monitor-group-home.component';

describe('MonitorGroupHomeComponent', () => {
  let component: MonitorGroupHomeComponent;
  let fixture: ComponentFixture<MonitorGroupHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorGroupHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorGroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
