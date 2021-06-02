import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaptopCustomerComponent } from './list-laptop-customer.component';

describe('ListLaptopCustomerComponent', () => {
  let component: ListLaptopCustomerComponent;
  let fixture: ComponentFixture<ListLaptopCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLaptopCustomerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLaptopCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
