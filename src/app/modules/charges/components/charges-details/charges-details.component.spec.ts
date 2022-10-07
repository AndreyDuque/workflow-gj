import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesDetailsComponent } from './charges-details.component';

describe('ListProcessChargesComponent', () => {
  let component: ChargesDetailsComponent;
  let fixture: ComponentFixture<ChargesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
