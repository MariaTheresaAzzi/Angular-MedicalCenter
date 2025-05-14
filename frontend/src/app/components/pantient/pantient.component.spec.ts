import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantientComponent } from './pantient.component';

describe('PantientComponent', () => {
  let component: PantientComponent;
  let fixture: ComponentFixture<PantientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
