import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemParameterHomeComponent } from './system-parameter-home.component';

describe('SystemParameterHomeComponent', () => {
  let component: SystemParameterHomeComponent;
  let fixture: ComponentFixture<SystemParameterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemParameterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemParameterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
