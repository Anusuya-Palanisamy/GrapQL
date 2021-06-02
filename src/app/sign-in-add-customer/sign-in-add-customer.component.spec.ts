import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAddCustomerComponent } from './sign-in-add-customer.component';

describe('SignInAddCustomerComponent', () => {
  let component: SignInAddCustomerComponent;
  let fixture: ComponentFixture<SignInAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInAddCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
