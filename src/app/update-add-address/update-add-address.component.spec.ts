import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddAddressComponent } from './update-add-address.component';

describe('UpdateAddAddressComponent', () => {
  let component: UpdateAddAddressComponent;
  let fixture: ComponentFixture<UpdateAddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAddAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
