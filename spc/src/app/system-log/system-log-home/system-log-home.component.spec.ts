import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLogHomeComponent } from './system-log-home.component';

describe('SystemLogHomeComponent', () => {
  let component: SystemLogHomeComponent;
  let fixture: ComponentFixture<SystemLogHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemLogHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemLogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
