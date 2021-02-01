import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockHomeComponent } from './lock-home.component';

describe('LockHomeComponent', () => {
  let component: LockHomeComponent;
  let fixture: ComponentFixture<LockHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
