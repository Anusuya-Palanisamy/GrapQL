import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLaptopComponent } from './buy-laptop.component';

describe('BuyLaptopComponent', () => {
  let component: BuyLaptopComponent;
  let fixture: ComponentFixture<BuyLaptopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyLaptopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
