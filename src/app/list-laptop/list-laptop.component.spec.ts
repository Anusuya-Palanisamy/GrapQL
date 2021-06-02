import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaptopComponent } from './list-laptop.component';

describe('ListLaptopComponent', () => {
  let component: ListLaptopComponent;
  let fixture: ComponentFixture<ListLaptopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLaptopComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
