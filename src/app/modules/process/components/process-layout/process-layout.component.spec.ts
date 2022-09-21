import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLayoutComponent } from './process-layout.component';

describe('ProcessLayoutComponent', () => {
  let component: ProcessLayoutComponent;
  let fixture: ComponentFixture<ProcessLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
