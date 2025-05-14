import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdocComponent } from './formdoc.component';

describe('FormdocComponent', () => {
  let component: FormdocComponent;
  let fixture: ComponentFixture<FormdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormdocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
