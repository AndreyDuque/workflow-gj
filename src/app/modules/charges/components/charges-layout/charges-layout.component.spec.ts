import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesLayoutComponent } from './charges-layout.component';

describe('ChargesLayoutComponent', () => {
  let component: ChargesLayoutComponent;
  let fixture: ComponentFixture<ChargesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
