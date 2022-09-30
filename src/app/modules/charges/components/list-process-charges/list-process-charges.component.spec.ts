import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessChargesComponent } from './list-process-charges.component';

describe('ListProcessChargesComponent', () => {
  let component: ListProcessChargesComponent;
  let fixture: ComponentFixture<ListProcessChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcessChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcessChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
