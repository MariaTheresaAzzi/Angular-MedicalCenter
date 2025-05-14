import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpatientComponent } from './formpatient.component';

describe('FormpatientComponent', () => {
  let component: FormpatientComponent;
  let fixture: ComponentFixture<FormpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormpatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
