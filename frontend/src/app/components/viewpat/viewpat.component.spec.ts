import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatComponent } from './viewpat.component';

describe('ViewpatComponent', () => {
  let component: ViewpatComponent;
  let fixture: ComponentFixture<ViewpatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
