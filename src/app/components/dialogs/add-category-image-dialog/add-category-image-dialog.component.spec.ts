import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryImageDialogComponent } from './add-category-image-dialog.component';

describe('AddCategoryImageDialogComponent', () => {
  let component: AddCategoryImageDialogComponent;
  let fixture: ComponentFixture<AddCategoryImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
