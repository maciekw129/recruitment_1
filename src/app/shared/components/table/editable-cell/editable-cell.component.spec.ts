import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableCellComponent } from './editable-cell.component';

describe('EditableCellComponent', () => {
  let component: EditableCellComponent<any>;
  let fixture: ComponentFixture<EditableCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
