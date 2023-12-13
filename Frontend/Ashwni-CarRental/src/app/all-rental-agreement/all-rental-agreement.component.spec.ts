import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRentalAgreementComponent } from './all-rental-agreement.component';

describe('AllRentalAgreementComponent', () => {
  let component: AllRentalAgreementComponent;
  let fixture: ComponentFixture<AllRentalAgreementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRentalAgreementComponent]
    });
    fixture = TestBed.createComponent(AllRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
