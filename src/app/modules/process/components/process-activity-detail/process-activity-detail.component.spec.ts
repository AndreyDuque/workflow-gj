import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessActivityDetailComponent } from './process-activity-detail.component';

describe('ProcessActivityDetailComponent', () => {
  let component: ProcessActivityDetailComponent;
  let fixture: ComponentFixture<ProcessActivityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessActivityDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
