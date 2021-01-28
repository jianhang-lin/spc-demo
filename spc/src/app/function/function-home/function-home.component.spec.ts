import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionHomeComponent } from './function-home.component';

describe('FunctionHomeComponent', () => {
  let component: FunctionHomeComponent;
  let fixture: ComponentFixture<FunctionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
