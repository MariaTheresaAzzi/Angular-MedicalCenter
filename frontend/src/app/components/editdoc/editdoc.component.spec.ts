import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdocComponent } from './editdoc.component';

describe('EditdocComponent', () => {
  let component: EditdocComponent;
  let fixture: ComponentFixture<EditdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditdocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
