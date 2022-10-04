import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDocumentDetailComponent } from './process-document-detail.component';

describe('ProcessDocumentDetailComponent', () => {
  let component: ProcessDocumentDetailComponent;
  let fixture: ComponentFixture<ProcessDocumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDocumentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
