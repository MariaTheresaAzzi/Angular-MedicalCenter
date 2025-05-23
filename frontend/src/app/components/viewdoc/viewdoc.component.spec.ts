import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdocComponent } from './viewdoc.component';

describe('ViewdocComponent', () => {
  let component: ViewdocComponent;
  let fixture: ComponentFixture<ViewdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewdocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
