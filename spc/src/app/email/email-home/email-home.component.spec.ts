import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHomeComponent } from './email-home.component';

describe('EmailHomeComponent', () => {
  let component: EmailHomeComponent;
  let fixture: ComponentFixture<EmailHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
