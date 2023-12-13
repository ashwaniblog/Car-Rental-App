import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalOrdersComponent } from './rental-orders.component';

describe('RentalOrdersComponent', () => {
  let component: RentalOrdersComponent;
  let fixture: ComponentFixture<RentalOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalOrdersComponent]
    });
    fixture = TestBed.createComponent(RentalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
