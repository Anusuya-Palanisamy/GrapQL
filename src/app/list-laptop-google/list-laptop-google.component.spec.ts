import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLaptopGoogleComponent } from './list-laptop-google.component';

describe('ListLaptopGoogleComponent', () => {
  let component: ListLaptopGoogleComponent;
  let fixture: ComponentFixture<ListLaptopGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLaptopGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLaptopGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
